---
name: database-design
description: Method to design database tables for Prisma and PostgreSQL. Write the business rules, find the keys, test the normal forms, remove each column that is not needed, and use enums for fixed lists. Use it when you create or change a Prisma schema, a model, a table, a column, an enum, or a migration. Use it when you review a schema. Use it when the user says "/database-design", "design the database", "normalize this", or "is this schema correct".
disable-model-invocation: false
user-invocable: true
---

# Database design

Design tables that hold each fact once. Hold only the facts that a feature needs. Use an enum for each fixed list.

A fact that the database stores twice can change in one place and stay old in the other place. Then the two copies disagree, and no code can tell which copy is correct. Most rules in this skill remove one way for a second copy to exist. The other rules remove columns that no feature needs.

## The method

Do the steps in this order. Each step uses the output of the step before it.

1. Model the business.
2. Write the dependency rules.
3. Find the keys.
4. Test the normal forms.
5. Check each split.
6. Check that each column is needed.
7. Use enums for fixed lists.
8. Remove the patterns to avoid.
9. Report the result.

To review a schema that exists, apply the same steps to each model.

A worked example of all steps is at the end of this file.

## Rule for gaps

If you do not know a business rule, ask the user. Do not guess the rule. Do not apply your own opinion silently.

A wrong rule gives wrong keys, and wrong keys give wrong splits.

## Step 1 — Model the business

Describe the business before you write a table.

1. List the entities. An entity is a thing that the business keeps track of. Examples: a customer, an order, a call.
2. For each entity, write the rule that tells when two records are the same real thing. Example: two customers with the same email are one customer.
3. Name each relationship with a verb. Example: "a customer places an order".
4. For each relationship, write how many records can be on each side. Write if each side is optional. Example: "One customer places zero or more orders. Each order has exactly one customer."
5. Find the subtypes. A subtype is a kind of an entity with its own data. Example: a payment is a card payment or a bank transfer.
6. Show the model to the user. Ask the user to confirm each rule.

## Step 2 — Write the dependency rules

A dependency rule says that one column, or a set of columns, decides the value of another column. Database theory calls this rule a "functional dependency".

Write each rule in this form: `orderId → orderDate`. Read it as "each order ID has exactly one order date".

1. For each table, write all dependency rules.
2. Take each rule from the business, not from sample data. Sample data can show a pattern that the business does not require.
3. If you are not sure that a rule is true, ask the user.

Example of a false rule: "the postal code decides the country". Two countries can use the same postal code.

Do not say which normal form a table has before this list exists. A normal form is a statement about the dependency rules. With no list, the statement is a guess.

## Step 3 — Find the keys

A key is a set of columns that decides every other column of the table. No smaller set of these columns can do the same. Read the keys from the dependency rules.

1. Find each set of columns that decides all other columns.
2. Remove a column from the set if the other columns of the set still decide all columns.
3. Write each key. A table can have more than one key.
4. Choose one key as the primary key. Give each other key a unique constraint: `@unique` or `@@unique` in Prisma.

A generated ID, for example `@default(cuid())`, is a correct primary key. It does not replace the business key from step 1. If the email identifies a customer, add `@unique` to `email`. If you do not, two rows can hold the same customer.

## Step 4 — Test the normal forms

Test each table against each normal form, in order. Each normal form removes one kind of duplicate fact. When a table fails, split it. Then test the new tables again.

| Normal form | The test | The problem when the test fails | The fix |
|---|---|---|---|
| First | Each column holds one value. No group of columns repeats. | `tags = "urgent,billing"`, or `phone1`, `phone2`, `phone3`. A query cannot find one value. The number of values has a fixed limit. | A child table with one row for each value. |
| Second | Each column that is not part of a key depends on the whole key, not on a part of it. Only a key of two or more columns can fail. | In `OrderLine(orderId, productId, orderDate)`, the order date depends on `orderId` alone. Each line of the order repeats the date. | Move the column to a table whose key is that part. |
| Third | No column that is not part of a key depends on another such column. | In `Order(id, customerId, customerEmail)`, the email depends on `customerId`. Each order of the customer repeats the email. | Move the column to the table of the column that decides it. |
| Boyce-Codd | The left side of each dependency rule is a key. This is a stricter version of third normal form. | See the example in step 5. | Split the table. Then do step 5. |
| Fourth | A table does not hold two independent lists for one key. | `EmployeeSkillLanguage(employeeId, skill, language)`, when skills and languages have no relation. Each skill repeats with each language. | One table for each list: `EmployeeSkill` and `EmployeeLanguage`. |
| Fifth | This case is rare. It applies only to a table whose key holds all its columns, three or more. | The table can rebuild each of its rows from smaller tables, one table for each pair of columns. | Ask the user if each fact in the table follows from its pairs. If yes, split the table into the pairs. |

## Step 5 — Check each split

A split must lose nothing. Check two things.

1. **No lost or extra rows.** A join of the new tables must give back exactly the rows of the old table. This is true when the shared column is a key of one of the new tables. Example: `Order` and `OrderLine` share `orderId`, and `orderId` is the key of `Order`.
2. **No lost business rule.** Each dependency rule must stay inside one new table. Then a key or a unique constraint can enforce it.

If a Boyce-Codd split loses a rule, there are two options. Ask the user which option to use.

- Keep the table in third normal form. The table then repeats one fact.
- Split the table, and enforce the lost rule with a separate check. The check is a trigger in the SQL of the migration, or a check in the one write path of the app.

### Example of a lost rule

A student takes a subject with one advisor. Each advisor teaches one subject.

- `(studentId, subject) → advisorId`
- `advisorId → subject`

The table is `Advising(studentId, subject, advisorId)`. Its keys are `(studentId, subject)` and `(studentId, advisorId)`.

The table passes third normal form, because `subject` is part of a key. It fails Boyce-Codd, because `advisorId` decides `subject`, but `advisorId` is not a key.

The split gives `Advisor(advisorId, subject)` and `Advising(studentId, advisorId)`. The join loses no rows. But the rule "one advisor for each student and subject" now spans two tables. No unique constraint can enforce it. A student can get two advisors for one subject.

## Step 6 — Check that each column is needed

Each column must pass two tests:

1. A feature reads the column.
2. No other place already holds the value of the column.

The types below are the ways a column can fail these tests. Check each column against each type.

### 6.1 — A value that a query can compute

The value comes from other columns of the same row, or from other rows.

- Same row: `fullName` from `firstName` and `lastName`. `lineTotal` from `unitPrice` and `quantity`.
- Other rows: `commentCount`, `hasChildren`, `lastMessageAt`. `balance` as the sum of the transactions. `currentStatus` as the newest row of a status history.

Fix: remove the column. A query computes the value when a feature needs it.

### 6.2 — Two columns that hold the same state

Examples: `isActive` next to `status`. `isDeleted` next to `deletedAt`. `isVerified` next to `verifiedAt`.

Fix: keep one column. A nullable timestamp holds the state and the time together: `deletedAt = null` means "not deleted". When several boolean columns describe one state, replace them with one enum (step 7).

### 6.3 — A copy of a column from another table

Example: `Order.customerName` when `Customer.name` exists. Third normal form finds this type.

Fix: remove the copy. Read the value through the relation.

### 6.4 — Several values in one column, or one value spread over numbered columns

Examples: `tags = "urgent,billing"`, or `phone1`, `phone2`, `phone3`. First normal form finds this type.

Fix: a child table with one row for each value.

### 6.5 — A second path to the same row

Example: `OrderLine.customerId` when `OrderLine → Order → Customer` already leads to the customer. The two paths can disagree.

Fix: remove the shortcut column.

Third normal form finds this type only if step 2 wrote the rule `orderId → customerId`. Look for this type on purpose, because the shortcut column looks like a normal foreign key.

### 6.6 — The same value in two units or two formats

Examples: `durationSeconds` next to `durationMs`. `price` next to `priceCents`. With `startedAt`, `endedAt`, and `durationSeconds`, any two of the three columns give the third.

Fix: keep one unit. Keep the columns that hold the facts: `startedAt` and `endedAt`. A query computes the duration.

### 6.7 — A column that no feature reads

Examples: a column from a feature that the app no longer has. A column that someone added "for later". Personal data that no feature needs.

Search the code for the name of each column. A column with no read in the code is a candidate for this type.

Fix: remove the column. Add it again when a feature needs it.

### 6.8 — A column with the same value in every row

Examples: `currency = 'USD'` in an app with one currency. `source = 'web'` when no other source exists.

Fix: remove the column. Add it when a second value exists.

### 6.9 — Columns that only one kind of row uses

Example: `Payment.cardLast4` and `Payment.bankIban`. A card payment leaves `bankIban` empty. A bank transfer leaves `cardLast4` empty.

There are two fixes:

- One table for each kind of payment. Each table has a link to the shared `Payment` row. Use this fix when each kind has many columns of its own.
- One enum column for the kind, and a database check that each kind fills only its own columns. Use this fix when each kind has one or two columns of its own.

If the Prisma schema cannot express the check, add the check as SQL to the migration file.

### 6.10 — A raw payload next to the columns parsed from it

Example: a `rawResponse` JSON column that holds `status`, next to a `status` column. After a change to one copy, the two copies disagree.

Fix: choose one copy as the source. Read only that copy. If no feature reads the payload, remove it.

### 6.11 — A copy of data that an external system owns

Examples: the transcript of a Vapi call. The email of a Stripe customer. The external system can change its data, but the copy in the database stays the same.

Fix: store only the external ID. Fetch the data from the external system when a feature needs it.

### 6.12 — Two sources for the list of allowed values

Examples: a Prisma enum `CallStatus`, and also a `CallStatus` table with the same values. A list in the code that does not match the enum in the database.

Fix: keep one source. Use a Prisma enum for a fixed list. Use a lookup table for a list that users change (step 7).

### 6.13 — Two identifiers for one row

Example: `id` and `uuid` on one model, when nothing needs both.

Fix: keep one identifier.

A short public code for URLs is a correct second identifier, if the internal ID must stay hidden.

### 6.14 — A flag that marks one row in a group

Examples: `isLatest` on a version row. `isPrimary` on an address row. Two rows can both get `true`, or no row gets it.

There are two fixes:

- `isLatest` is a value that a query can compute: the row with the highest version number. Remove the column (type 6.1).
- `isPrimary` is a real fact, but it belongs on the parent row: `Customer.primaryAddressId`. Then the structure allows only one primary address.

### Exceptions — when a stored value is correct

A value that the types above remove is correct to store in these cases only:

1. **A copy from one point in time.** Examples: the price on an order line, or the agent settings at the time of a call. The product price can change later, but the order line must keep the old price. Such a copy records a new fact.
2. **A measured speed problem.** A query is too slow, and someone measured it. The stored value then needs one write path that keeps it correct. The other option is a column that PostgreSQL computes itself (a generated column).
3. **Data that the app cannot get again.** The external system deletes the data after some time, or its API cannot read the data.
4. **Data that a query must filter or sort on**, when that data exists only in a JSON payload or in an external system.

When you keep a value under an exception, tell the user the number of the exception and the reason.

## Step 7 — Use enums for fixed lists

A fixed list is a set of values that only a code change can extend. Examples: a status, a kind, a mode, a provider, a direction.

1. Give each column with a fixed list a Prisma `enum`. Do not use `String`. A `String` column accepts any text, so a typo becomes a new status.
2. If users add or change values while the app runs, use a lookup table. A lookup table holds the list, with one row for each value. The column becomes a foreign key to the lookup table.
3. If each value needs extra data, for example a label or a sort order, use a lookup table too.
4. If two or more boolean columns describe one state, replace them with one enum. Example: `isDraft` and `isPublished` allow a row that is both. A `status` enum with `draft`, `published`, and `archived` allows only one state.
5. Keep one source for the list (type 6.12). The code reads the enum that Prisma generates. Do not copy the values into a second list in the code.
6. Write the enum values in the style that the project already uses.

## Step 8 — Remove the patterns to avoid

1. **The Entity-Attribute-Value pattern.** A generic table with the columns `entityId`, `attributeName`, and `value` hides the real columns. No type, no foreign key, and no not-null rule can apply to a value. Fix: real columns. For subtypes, use type 6.9.
2. **A reference column with no foreign key.** Example: `Comment.targetId` and `Comment.targetType`, where the target is a post, an article, or a video. The database cannot check that the target exists. There are two fixes:
   - One nullable foreign key column for each target table, and a database check that exactly one of them is set.
   - One shared parent table. Each target table references the parent table, and `Comment` references the parent table.
3. **A JSON column for data that always has the same fields.** The database cannot check types, not-null rules, or foreign keys inside JSON. Fix: real columns, or a child table.

## Step 9 — Report the result

Show the user these items, in this order:

1. The dependency rules of each table (step 2).
2. The keys of each table (step 3).
3. The highest normal form that each table passes, and each split (steps 4 and 5).
4. Each column that step 6 removes, with its type number. Each column that an exception keeps, with the exception number.
5. Each enum and each lookup table (step 7).
6. The final Prisma schema.

In a review of a schema that exists, do not change the schema without the approval of the user. A column can look unneeded but have a reason that the schema does not show. Report each finding first.

## Worked example

### The start

```prisma
model OrderLine {
  orderId       String
  productId     String
  orderDate     DateTime
  customerId    String
  customerEmail String
  productName   String
  unitPrice     Decimal
  quantity      Int
  lineTotal     Decimal
  status        String
  isPaid        Boolean

  @@id([orderId, productId])
}
```

### Step 1 — The business rules from the user

- One customer places zero or more orders. Each order has exactly one customer.
- An order has one or more lines. Each line names one product.
- The email identifies a customer.
- The unit price on a line is the price at the time of the order. The product price can change later.
- An order is `pending`, `paid`, `shipped`, or `cancelled`.

### Step 2 — The dependency rules

- `orderId → orderDate, customerId, status, isPaid`
- `customerId → customerEmail`
- `productId → productName`
- `(orderId, productId) → unitPrice, quantity`
- `(unitPrice, quantity) → lineTotal`
- `status → isPaid`

### Step 3 — The key

The key is `(orderId, productId)`. It decides every column. `orderId` alone does not decide `quantity`. `productId` alone does not decide `quantity`.

### Step 4 — The normal forms

- **First:** each column holds one value. The table passes.
- **Second:** the table fails. `orderDate`, `customerId`, `customerEmail`, `status`, and `isPaid` depend on `orderId` alone. `productName` depends on `productId` alone. The split gives `Order`, `Product`, and `OrderLine`.
- **Third:** `Order` fails, because `customerEmail` depends on `customerId`. Move `customerEmail` to a new table `Customer`. `Order` also fails because `isPaid` depends on `status`. `OrderLine` fails, because `lineTotal` depends on `unitPrice` and `quantity`.
- **Boyce-Codd:** after the splits, the left side of each rule is a key of its table. The tables pass.

### Step 5 — The splits

Each split shares a column that is the key of one new table: `orderId`, `productId`, and `customerId`. A join gives back the original rows. Each rule stays inside one table. No rule is lost.

### Step 6 — The needed values

- `lineTotal`: type 6.1. A query computes it. Remove it.
- `isPaid`: type 6.2. `status` holds the same state. Remove it.
- `customerEmail` on the order: type 6.3. Step 4 already moved it to `Customer`.
- `unitPrice` on the line: keep it under exception 1. It is the price at the time of the order.

### Step 7 — The enums

`status String` becomes the enum `OrderStatus`, because the list of statuses is fixed.

### The result

```prisma
enum OrderStatus {
  pending
  paid
  shipped
  cancelled
}

model Customer {
  id     String  @id @default(cuid())
  email  String  @unique
  orders Order[]
}

model Product {
  id    String      @id @default(cuid())
  name  String
  lines OrderLine[]
}

model Order {
  id         String      @id @default(cuid())
  orderDate  DateTime
  status     OrderStatus
  customerId String
  customer   Customer    @relation(fields: [customerId], references: [id])
  lines      OrderLine[]
}

model OrderLine {
  orderId   String
  productId String
  unitPrice Decimal
  quantity  Int
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@id([orderId, productId])
}
```

## Check before you finish

1. Each table has a written list of dependency rules.
2. Each business key has a primary key or a unique constraint.
3. Each table passes Boyce-Codd normal form, or the report names the rule that a split would lose.
4. Each column passes the two tests of step 6, or the report names its exception.
5. No column with a fixed list has the type `String`.
6. Each list of allowed values has one source.
7. Each reference column has a foreign key.
