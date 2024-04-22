# tool-release-bundle

Attach source archives that include all submodules to GitHub releases.

## Usage

```yaml
---
name: Release asset with submodules

on:
  release:
    types: [published]

permissions:
  contents: write

jobs:
  add_release_asset:
    runs-on: ubuntu-latest

    steps:
      - uses: uclahs-cds/tool-release-bundle@v1
        with:
          read-token: ${{ secrets.UCLAHS_CDS_REPO_READ_TOKEN }}
```

### Variables

|Name|Required|Description |
|-|-|-|
| `read-token` | False (ish) | Token used to clone the repository and submodules. The default `GITHUB_TOKEN` will work if all submodules are public. Otherwise a personal access token with `contents: read` permission to all submodules must be used. |
| `write-token` | False | Token used to attach the source archive to the release. The default `GITHUB_TOKEN` will work if the workflow is granted `contents: write` permissions. |

## Versioning

Per [GitHub's advice](https://docs.github.com/en/actions/creating-actions/about-custom-actions#using-tags-for-release-management) for release management, this repository uses semantic version tags. The key details are:

* Full semantic version tags, such as `v1.0.2`, are immutable and will always refer to the same commit hash.
* Major version tags, such as `v1` or `v2`, are kept up-to-date with the latest matching semantic version tag.

Callers should use the latest major version tag (currently `v1`), as that will refer to the most recent stable and backwards-compatible version. Specifying semantic version tags is discouraged unless there is a specific need for absolute reproducibility.


## License

Author: Nicholas Wiltsie (nwiltsie@mednet.ucla.edu), Yash Patel (yashpatel@mednet.ucla.edu)

tool-release-bundle is licensed under the GNU General Public License version 2. See the file LICENSE.md for the terms of the GNU GPL license.

A GitHub composite Action to attach source archives with submodules to releases.

Copyright (C) 2024 University of California Los Angeles ("Boutros Lab") All rights reserved.

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
