export class LimitedSizeMediaStore {
  constructor(originalStore, cms) {
    this.originalStore = originalStore;
    this.cms = cms;
    this.accept = originalStore.accept; // keep original accept types
  }

  async persist(files) {
    const maxSizeInBytes = 1_000_000; // 1MB

    for (const file of files) {
      if (file.file.size > maxSizeInBytes) {
        // Instead of just throwing, show a nice toast
        this.cms?.alerts?.add({
          level: "error",
          message: `The file "${file.file.name}" is too large. Max size is 1MB.`,
        });
        // Also throw to stop upload
        throw new Error(`File "${file.file.name}" exceeds 1MB limit.`);
      }
    }

    // ✅ If size is good, proceed normally
    return this.originalStore.persist(files);
  }

  async previewSrc(file) {
    return this.originalStore.previewSrc(file);
  }

  async list() {
    return this.originalStore.list();
  }
}
