module.exports = async ({ context, core, exec, process, github, fs }) => {
  // Make sure that there is an existing release
  if (context.eventName !== 'release' || context.payload.action !== 'published') {
    core.setFailed('Action must be triggered by a `release.published` event!')
    process.exit()
  }

  const filename = `${context.repo.repo}-with-submodules-${context.payload.release.tag_name}.tar.gz`
  const tarball = `${process.env.RUNNER_TEMP}/${filename}`

  await exec.exec('tar', ['--exclude-vcs', '-czvf', tarball, context.repo.repo])

  await github.rest.repos.uploadReleaseAsset({
    owner: context.repo.owner,
    repo: context.repo.repo,
    release_id: context.payload.release.id,
    name: filename,
    data: await fs.readFileSync(tarball)
  })
}
