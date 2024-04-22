#!/usr/bin/env bash
set -euo pipefail

readonly TARBALL="$REPONAME-with-submodules-$TAG.tar.gz"

# Create the tarball
tar --exclude-vcs -czvf "$TARBALL" "$REPONAME"

# Check if a release exists with this tag
if gh release view "$TAG"; then
    # There is an existing release
    # Attach the tarball to it
    gh release upload \
        "$TAG" \
        "$TARBALL"
else
    # There is not an existing release
    # Create the release with auto-generated notes
    gh release create \
        --generate-notes \
        --verify-tag \
        "$TAG" \
        "$TARBALL"
fi
