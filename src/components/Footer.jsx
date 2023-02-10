const Footer = () => {
   const year = new Date().getFullYear();
   return (
      <footer>
         <div className='copyRight'>
            <p>{`Copyright © Laurynas ${year} exam`}</p>
         </div>
         <div className='terms'>
            <p>Terms and Use</p>
         </div>
      </footer>
   );
}

export default Footer;