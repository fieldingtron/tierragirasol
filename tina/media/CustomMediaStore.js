const { GithubMediaStore } = require("tinacms");

class LimitedGithubMediaStore extends GithubMediaStore {
  async persist(files) {
    const maxSizeInBytes = 1_000_000; // 1MB

    for (const file of files) {
      if (file.file.size > maxSizeInBytes) {
        throw new Error(
          `The file "${file.file.name}" is too large. Maximum allowed size is 1MB.`
        );
      }
    }

    // ✅ If all files are valid size, fallback to default GitHub upload
    return super.persist(files);
  }
}

module.exports = { LimitedGithubMediaStore };
