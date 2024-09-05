import NotesIcon from '@mui/icons-material/Notes';
// header component
function Header() {
  return (
    <a style={{textDecoration: "none"}} target="_blank" href="https://github.com/DaneshVerma/Memo-Manager-MERN-Stack-APP">
      <header >
        <h1 className="text-2xl" >Memo's-Manager<NotesIcon/></h1>
      </header>
    </a>
  );
}

export default Header;
