# Contributing to tldr

First of all, thank you very much for taking the time to contribute to the
project!

We strongly encourage you to read our [Code of Conduct](CODE_OF_CONDUCT.md) beforehand. It mainly
contains basic guidelines we expect from our community.

## Communication Language

tldr strives to give international support. Thus, English is the project's
official language.

The use of other languages on Issues and Pull Requests is frowned upon, but it
will not be reason for dismissal. Support for other languages will not be,
necessarily, provided, though.

## Bug Reports

If you found a bug, please open an issue on the project and tag it with a *bug*
label.

The [Openning Issues](#openning-issues) section contains guidelines on openning new issues on the
project.

## Openning Issues

The project contains an *Issue Template* file (on `.github/ISSUE_TEMPLATE.md`). The
issue template is a general guideline that aims to standardize all issues on
the project. Issues that do not conform to the template will be closed.

Issues should strive to clearly explain their purpose: be it a bug report, an
enhancement suggestion or a criticism, they should state it clearly enough so
as any member of the community could understand it. References should be placed
where necessary and labels should be used to express intent.

## Openning Pull Requests

As with Issues, Pull Requests also have a template (on
`.github/PULL_REQUEST_TEMPLATE.md`). The template is a general guideline to
standardize the code changes request. Pull Requests that do not conform to the
template will be closed.

Pull Requests should be clear and thorough: they should completely explain the
changes included, as well as the general purpose (business logic) behind it.

All changes should also be clearly explained on their commit messages. tldr
follows [Pagar.me's Git Style Guide](https://github.com/pagarme/git-style-guide) and Pull Requests submitted should contain
commits according to that style.

All code written should be in accordance with the following rules:

### Code should be clear and unambiguous

Code obfuscation is frowned upon. If there is a clearer way of implementing something, it is probably worth it. People won't often optimize code better than compilers, nowadays.

Unless there is a valid reason for implementing some piece of code in a fancier, unclearer way, pull requests with this format won't be accepted.

### Tests are necessary

Whenever new functionalities or new behaviours are inserted, tests for those functionalities or behaviours should follow.

Tests should be simple and straightforward. Opposite to functionality code, tests shouldn't have the need to be commented. They should be read and understood at once.

Tests should cover as much as possible. We strive for 80%+ code coverage on this project.<Paste>

