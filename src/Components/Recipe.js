// import 'bootstrap/dist/css/bootstrap.min.css';

const Recipe = ({recipe}) => {

  return (
    <div>
     <img src="https://www.allrecipes.com/thmb/BKa1OqunLWMkCDJm_3LtxF_Pn88=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/23600-worlds-best-lasagna-DDMFS-4x3-1196-24c5401652934ffb96d3d94bc9fbe2d7.jpg" width={200}/>
      
      <br />
      {recipe.name}
    </div>
  );
};

export default Recipe;
