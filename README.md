# Renamify CLI [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[BuildStatusURL]: https://github.com/coderaiser/node-renamify-cli/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/node-renamify-cli/workflows/Node%20CI/badge.svg
[NPMIMGURL]: https://img.shields.io/npm/v/renamify-cli.svg?style=flat
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/renamify-cli "npm"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/node-renamify-cli?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/node-renamify-cli/badge.svg?branch=master&service=github

Rename group of files from a directory with help of an editor.

## Install

`npm i renamify-cli --save`

## Usage

Edit files names in the `$EDITOR` of choice. Run:

```
$ renamify
```

Edit file names in editor, save and exit. New names will be applied if names count hasn't changed.
It works in similar way to `git rebase -i`.

## Related

- [renamify](https://github.com/coderaiser/node-renamify "renamify") - Rename group of files from a directory.

## License

MIT

