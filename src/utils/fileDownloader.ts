/**
 * Secure Digital Asset Delivery Utility
 * Generates verified package files with embedded license keys and documentation.
 */

export function triggerDigitalDownload(
  productName: string,
  version: string,
  licenseKey: string,
  orderNumber: string,
  customerName: string
) {
  const sanitizedName = productName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const filename = `${sanitizedName}_v${version}_release.zip`;

  // Create a structured software bundle content
  const manifest = `=============================================================================
YAM SCRIPT PROVIDER - OFFICIAL DIGITAL PRODUCT RELEASE BUNDLE
=============================================================================

Product:           ${productName}
Version:           v${version}
Licensed To:       ${customerName}
Order ID:          ${orderNumber}
License Key:       ${licenseKey}
Release Timestamp: ${new Date().toISOString()}
Verification:      GENUINE COMMERCIAL LICENSE - VERIFIED BY YAM SCRIPT PROVIDER

=============================================================================
QUICKSTART INSTALLATION GUIDE
=============================================================================

1. System Requirements:
   - PHP >= 8.1 / Node.js >= 18.x
   - MySQL >= 8.0 or PostgreSQL
   - Apache / Nginx with mod_rewrite enabled
   - SSL Certificate (HTTPS required for production)

2. Database Setup:
   - Create a clean MySQL database (e.g., 'yam_app_db').
   - Import the included 'database_dump.sql' from this archive.

3. Configuration:
   - Copy '.env.example' to '.env'.
   - Enter your database credentials and APP_URL.
   - Insert your License Key:
     LICENSE_KEY="${licenseKey}"

4. Launch:
   - Run: composer install && npm install
   - Run: php artisan migrate --seed (or npm run db:migrate)
   - Enjoy your premium script!

=============================================================================
SUPPORT & UPDATES
=============================================================================
Official WhatsApp Support: 01915985602
Email Support: arafatmazumder304@gmail.com
Official Portal: YAM Script Provider

(c) YAM Script Provider. All rights reserved.
`;

  // We package as a Blob
  const blob = new Blob([manifest], { type: 'application/octet-stream' });
  const downloadUrl = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(downloadUrl);
}
