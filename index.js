const core = require('@actions/core')
const github = require('@actions/github')

const { inspect } = require('util')

const PLATFORM = 'platform'
const ACTIONS_OPTIONS = {
  windows: 'windows-latest',
  macos: 'macos-latest',
  linux: 'ubuntu-latest'
}

async function run() {
  try {
    const clientPayload = github.context.payload.client_payload
    const { platformInstallData } = clientPayload

    if (['win32-ia32', 'win32-x64'].includes(platformInstallData.platform)) {
      core.setOutput(PLATFORM, ACTIONS_OPTIONS.windows)
    } else if (['darwin-x64', 'mas-x64'].includes(platformInstallData.platform)) {
      core.setOutput(PLATFORM, ACTIONS_OPTIONS.macos)
    } else if (['linux-ia32', 'linux-x64'].includes(platformInstallData.platform)) {
      core.setOutput(PLATFORM, ACTIONS_OPTIONS.linux)
    } else {
      core.setFailed(`Unsupported platform: ${platformInstallData.platform}`)
    }

    core.info(`Updated Electron version to ${versionQualifier}`)
  } catch (error) {
    core.debug(inspect(error))
    core.setFailed('Failed to update Electron version in this repo.')
  }
}

run()
