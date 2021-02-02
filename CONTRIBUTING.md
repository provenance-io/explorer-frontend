# Preface 

The Provenance Blockchain Explorer repository is built using [React](https://reactjs.org/), [Redux](https://redux.js.org/), and [Styled Components](https://styled-components.com/).  Most of the initial release work was started at Figure Technologies in 2020.

# Contributing

- [Preface](#preface)
- [Contributing](#contributing)
  - [Pull Requests](#pull-requests)
    - [Process for reviewing PRs](#process-for-reviewing-prs)

Thank you for considering making contributions to the Provenance Blockchain Explorer!

Contributing to this repo can mean many things such as participatingh in
discussion or proposing code changes. To ensure a smooth workflow for all
contributors, the general procedure for contributing has been established:

1. Either [open](https://github.com/provenance-io/explorer-frontend/issues/new/choose) or
   [find](https://github.com/provenance-io/explorer-frontend/issues) an issue you'd like to help with
2. Participate in thoughtful discussion on that issue
3. If you would like to contribute:
   1. If the issue is a proposal, ensure that the proposal has been accepted
   2. Ensure that nobody else has already begun working on this issue. If they have,
      make sure to contact them to collaborate
   3. If nobody has been assigned for the issue and you would like to work on it,
      make a comment on the issue to inform the community of your intentions
      to begin work
   4. Follow standard Github best practices: fork the repo, branch from the
      HEAD of `main`, make some commits, and submit a PR to `main`
      - For core developers, to ensure a clear ownership of branches, branches must be named with the convention `{moniker}/{issue#}-branch-name`
   5. Be sure to submit the PR in `Draft` mode submit your PR early, even if
      it's incomplete as this indicates to the community you're working on
      something and allows them to provide comments early in the development process
   6. When the code is complete it can be marked `Ready for Review`
   7. Be sure to include a relevant change log entry in the `Unreleased` section
      of `CHANGELOG.md` (see file for log format)

Note that for very small or blatantly obvious problems (such as typos) it is
not required to an open issue to submit a PR, but be aware that for more complex
problems/features, if a PR is opened before an adequate design discussion has
taken place in a github issue, that PR runs a high likelihood of being rejected.

Other notes:

- Looking for a good place to start contributing? How about checking out some
  [good first issues](https://github.com/provenance-io/provenance/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)

## Pull Requests

To accommodate review process we suggest that PRs are categorically broken up.
Ideally each PR addresses only a single issue. Additionally, as much as possible
code refactoring and cleanup should be submitted as a separate PRs from bugfixes/feature-additions.

### Process for reviewing PRs

All PRs require one Review before merge. When reviewing PRs please use the following review explanations:

- `LGTM` without an explicit approval means that the changes look good, but you haven't thoroughly reviewed it locally.
- `Approval` through the GH UI means that you understand the code and the documentation/spec is updated in the right places.  Note:
  - Naming must be consistent with conventions and the rest of the codebase
  - Code must live in a reasonable location
  - If you approve of the PR, you share responsibility for fixing any resulting issues
- If you are only making "surface level" reviews, submit any notes as `Comments` without adding a review.
