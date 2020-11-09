import Image from "next/image";

const ProductImageView = (props) => {
    
  // console.log(props);
    
  if (props.url !== "") {
    return (

        <Image
        src={props.url}
        alt={props.name}
        layout="responsive"
        width={props.width}
        height={props.height}
        className={props.className}
      />
    );
  }
  return (
    <Image
      src="/static/images/no-picture.jpg"
      alt="geen afbeelding"
      layout="responsive"
      width={props.width}
      height={props.height}
      className={props.className}
    />
  );
};
export default ProductImageView;
