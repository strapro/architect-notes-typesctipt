import arc from '@architect/functions';

const staticAsset = arc.http.helpers.static;

export default function layout({
  contents,
  showNav = true,
  isLoggedIn = true,
}) {
  let nav = '';

  let navLinks = `
		<a class="button subtle" href=/login>Log in</a>
		<a class="button" href=/signup>Sign up</a>
	`;
  if (isLoggedIn) {
    navLinks = `
			<a class="button subtle" href=/logout>Log out</a>
		`;
  }

  if (showNav) {
    nav = `
			<nav>
				<a href="/">
					<img class="logo" src="${staticAsset('/images/logo.svg')}"/>
				</a>
				<a href="https://arc.codes" target="_blank">Documentation</a>
				${navLinks}
			</nav>`;
  }

  return `<!DOCTYPE html>
	<html>
	<head>
		<title>Architect demo app</title>
		<link rel=stylesheet href="${staticAsset('/css/style.css')}">
		<link rel="icon" type="image/png" sizes="16x16" href="${staticAsset(
      '/images/architect-favicon-16.png'
    )}">
		<link rel="icon" type="image/png" sizes="32x32" href="${staticAsset(
      '/images/architect-favicon-32.png'
    )}">
		<link rel="icon" type="image/png" sizes="64x64" href="${staticAsset(
      '/images/architect-favicon-64.png'
    )}">
	</head>
	<body>	
		${nav}
		<body>
			${contents}
		</body>
	</html>`;
}
