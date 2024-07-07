// footer component
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div>Made BY <a href="https://github.com/DaneshwarVerma">@Danesh</a> ⓒ {year}</div>
    </footer>
  );
}

export default Footer;
