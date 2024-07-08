import NotesIcon from '@mui/icons-material/Notes';
// header component
function Header() {
  return (
    <a style={{textDecoration: "none"}} href="">
      <header >
        <h1 className="text-2xl" >Memo's-Manager<NotesIcon/></h1>
      </header>
    </a>
  );
}

export default Header;
