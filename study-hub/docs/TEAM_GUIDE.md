# Team guide

## Rules
1. Nobody commits directly to `main`.
2. Every change is a branch, then a pull request (PR).
3. Every PR needs an approval before it is merged. The owner approves members' PRs. A member approves the owner's PR.
4. Each person edits only their own files, so there are no merge conflicts.

## Who builds what
| Member | Branch name | Files they add or replace |
|---|---|---|
| Member 1 (owner) | `feature/member-1-todo` | `todo.html`, `css/todo.css`, `js/todo.js` |
| Member 2 | `feature/member-2-timer` | `timer.html`, `css/timer.css`, `js/timer.js` |
| Member 3 | `feature/member-3-quiz` | `quiz.html`, `css/quiz.css`, `js/quiz.js` |
| Member 4 | `feature/member-4-gpa` | `gpa.html`, `css/gpa.css`, `js/gpa.js` |

## Steps for every member
```
git clone <repository-url>
cd <repository-folder>
git checkout -b feature/member-N-name      # use your branch name from the table
# copy your ready-made files into the project (see your HOW-TO.txt)
git add .
git commit -m "Add <feature name>"
git push -u origin feature/member-N-name
```
Then open the repository on GitHub, click **Compare & pull request**, fill in the template, and submit.

## Steps for the reviewer
1. Open **Pull requests**, then the PR, then **Files changed**.
2. Click **Review changes**, choose **Approve**, and submit.
3. Click **Merge pull request**, then **Confirm merge**.
4. Everyone runs `git checkout main` and `git pull` before starting new work.

## One-time setup by the owner
1. Add teammates: **Settings, Collaborators, Add people** (give them Write access).
2. Protect `main`: **Settings, Branches, Add branch protection rule** (or **Rulesets**). Branch name pattern: `main`. Turn on:
   - Require a pull request before merging
   - Require approvals (1)
   - Require review from Code Owners
3. Edit `.github/CODEOWNERS` and replace the placeholder usernames with real ones (owner plus one trusted member).
4. Note: branch protection on a private repository needs a paid plan (GitHub Pro is free with the Student Developer Pack). Public repositories can use it for free.
