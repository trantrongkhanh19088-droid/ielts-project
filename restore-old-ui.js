/**
 * RESTORE OLD UI SCRIPT
 * Usage: node restore-old-ui.js
 * Restores the entire `src/` directory from `_backup_old_ui/src/`.
 */

const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '_backup_old_ui', 'src');
const TARGET_DIR = path.join(__dirname, 'src');

if (!fs.existsSync(BACKUP_DIR)) {
  console.error('❌ Thư mục backup không tồn tại:', BACKUP_DIR);
  process.exit(1);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('🔄 Đang khôi phục toàn bộ giao diện từ _backup_old_ui/src sang src/...');
try {
  copyRecursiveSync(BACKUP_DIR, TARGET_DIR);
  console.log('✅ Đã khôi phục giao diện ban đầu thành công 100%!');
} catch (err) {
  console.error('❌ Lỗi trong quá trình khôi phục:', err);
  process.exit(1);
}
