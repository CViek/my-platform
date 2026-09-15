# Engineering Notebook

This notebook documents the engineering decisions, production practices, and operational capabilities used to build and maintain this project.

It is intended to show how the system evolved beyond a working application into software that can be built, deployed, observed, secured, updated, and recovered safely.

The notebook provides concrete evidence of production engineering capabilities that can be discussed with recruiters, technical interviewers, teammates, and future maintainers.

Entries include:

* the decision or capability
* why it matters
* how it was implemented
* tradeoffs or limitations
* evidence or verification where meaningful

### WSL/Linux Development Environment

The project is developed inside WSL/Linux to reduce differences between local development and the Linux-based environments commonly used for automated builds, containers, and cloud deployment.

Implementation:

* The active repository is maintained inside the WSL/Linux filesystem.
* Git and project development commands are run from within the Linux environment.
* IDEs open the source files directly from the WSL filesystem.
* The repository is not maintained under `/mnt/c`, avoiding unnecessary Windows/Linux filesystem boundary issues.

Why it matters:

Using a Linux-based development environment reduces platform-specific surprises and provides a consistent foundation for later build, CI/CD, container, and deployment tooling. It also lowers the risk of problems caused by differences in paths, permissions, line endings, file watching, and shell behavior.

Tradeoffs / limitations:

WSL adds another environment layer that must be configured and maintained. Windows/WSL path boundaries can cause confusion if commands or IDEs operate on different copies of a project. The consistency benefits depend on keeping development work inside the intended WSL environment.

Evidence / verification:

* Local setup documented in `README.md`
* Project location verified with `pwd`: `/home/________/capstone/________`
* Git commands executed from the WSL repository
* Repository location verified to be inside the Linux filesystem

### Command-Line Git Workflow

Command-line Git is used to make repository state, branch history, and change tracking directly visible and explainable.

Implementation:

* Git operations are performed from within the project repository.
* One `.git/` directory tracks the complete project.
* Repository state is inspected with standard Git commands.
* Development work is performed on focused branches rather than directly on `main`.
* Changes reach `main` through pull requests.
* After a branch is merged, the local repository is returned to an updated and clean `main` before new work begins.

Why it matters:

Direct use of Git makes repository state and history explicit. This strengthens the ability to diagnose branch problems, recover from mistakes, understand how changes reached `main`, and investigate the source history associated with a particular version of the software.

The workflow also provides the foundation for later CI/CD, release tracking, and production investigation.

Tradeoffs / limitations:

Command-line Git requires engineers to understand repository and branch state before running commands. IDE integrations may provide convenience, but they do not remove the need to understand the underlying Git operations when diagnosing problems, resolving conflicts, or investigating release history.

Evidence / verification:

* Repository state verified with `git status`
* Commit history inspected with `git log`
* Changes merged through pull requests rather than direct pushes to `main`
* Completed branches removed locally and remotely after merge


### Protected Main Branch

The default branch is protected so that changes reach `main` through an intentional pull-request workflow rather than direct pushes.

Implementation:

* A GitHub ruleset targets the repository's default branch.
* Pull requests are required before changes can be merged into `main`.
* Force pushes and deletion of the protected branch are blocked.
* Direct pushes that violate the ruleset are rejected by GitHub.
* Additional automated gates will be added as the delivery pipeline matures.

Why it matters:

Protecting `main` creates a reviewable and auditable path for changes. It reduces the risk of accidental changes reaching the trusted branch and establishes the branch that later CI/CD and deployment processes can use as a controlled source.

Tradeoffs / limitations:

Branch protection controls changes to the shared GitHub branch but does not prevent accidental commits to a developer's local `main`. Engineers must still inspect local branch state and know how to preserve work that was committed on the wrong branch.

The current rules also do not yet verify that builds or tests succeed before merge. Automated status checks will be added after CI is introduced.

Evidence / verification:

* GitHub ruleset: `Protect main`
* Pull requests required before merge
* Direct push to protected `main` rejected by the repository ruleset
* Initial project-structure PR: #___

### Repository Structure and Engineering Conventions

The project uses an intentional repository structure and a repository-based engineering style guide to make development, review, automation, and maintenance more consistent.

Implementation:

* One Git repository tracks the complete application.

* Top-level directories separate major project responsibilities:

  * `backend/`
  * `frontend/`
  * `docs/`
  * `requirements/`

* Additional directories are added only when they serve a real project need.

* Project conventions are documented in `docs/style-guide.md`.

* The style guide establishes conventions for files, branches, commits, pull requests, configuration, source code, and future production-oriented development.

* Repository structure and conventions are changed through the same branch and pull-request workflow used for application code.

Why it matters:

A predictable repository structure makes the system easier to navigate, review, automate, and maintain. Documented conventions reduce unnecessary inconsistency and make engineering expectations visible rather than relying on personal habits or scattered instructions.

Keeping these conventions in the repository also provides a clear source of truth that can evolve with the project.

Tradeoffs / limitations:

Repository conventions should reduce friction rather than create unnecessary rules. The current structure and style guide provide a useful baseline, but they will evolve as the application gains real frontend, backend, database, CI/CD, and deployment capabilities.

Evidence / verification:

* Project structure introduced through PR #___
* Engineering style guide: `docs/style-guide.md`
* Style guide introduced or updated through PR #___
* Repository structure visible from the project root
