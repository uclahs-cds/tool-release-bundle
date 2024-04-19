module.exports = async ({ context, core, exec }) => {
  // Ensure that the GITHUB_REF is a tag
  if (context.ref.startsWith('refs/tags/v')) {
    const tag = context.ref.replace('refs/tags/v', '')
    const tarball = `${context.repo.repo}-with-submodules-${tag}.tar.gz`

    await exec.exec('tar', ['--exclude-vcs', '-czvf', tarball, context.repo.repo])
    core.setOutput('tar-file-path', tarball)
  } else {
    core.setFailed('GITHUB_REF is not a tag!')
  }
}
