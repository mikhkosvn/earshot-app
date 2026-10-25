import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { z } from 'zod';

import type { ThirdPartyNotice } from '@/server/third-party-notices/types';

import { normalizeRepositoryUrl } from './normalize-repository-url';

const UNKNOWN_LICENSE = 'Unknown';

const licenseNameSchema = z
  .union([
    z.string(),
    z
      .looseObject({ type: z.unknown() })
      .refine((license) => 'type' in license)
      .transform((license) => String(license.type)),
  ])
  .catch(UNKNOWN_LICENSE);

const packageManifestSchema = z.object({
  version: z.string().optional(),
  license: licenseNameSchema,
  repository: z.unknown(),
});

const COPYRIGHT_LINE_PATTERN =
  /^(copyright\s*(\(c\)|©|\d{4})|\(c\)\s*\d{4}|©)/i;
const LICENSE_FILE_PATTERN = /^(licen[cs]e|copying)(\.(md|txt|markdown))?$/i;

const readLicenseText = async (packageDirectory: string) => {
  const entries = await readdir(packageDirectory);
  const licenseFile = entries.find((entry) => LICENSE_FILE_PATTERN.test(entry));
  if (!licenseFile) return null;
  const text = await readFile(path.join(packageDirectory, licenseFile), 'utf8');
  return text.trim();
};

const findCopyright = (licenseText: string | null) => {
  if (!licenseText) return null;
  const line = licenseText
    .split('\n')
    .map((value) => value.trim())
    .find((value) => COPYRIGHT_LINE_PATTERN.test(value));
  return line ?? null;
};

export const readPackageNotice = async (
  nodeModulesDirectory: string,
  name: string,
): Promise<ThirdPartyNotice | null> => {
  const packageDirectory = path.join(nodeModulesDirectory, ...name.split('/'));
  try {
    const manifest = packageManifestSchema.parse(
      JSON.parse(
        await readFile(path.join(packageDirectory, 'package.json'), 'utf8'),
      ),
    );
    const licenseText = await readLicenseText(packageDirectory);
    return {
      name,
      version: manifest.version ?? '',
      license: manifest.license,
      copyright: findCopyright(licenseText),
      licenseText,
      repositoryUrl: normalizeRepositoryUrl(manifest.repository),
    };
  } catch {
    return null;
  }
};
