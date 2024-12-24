import {IMG_CDN_URL} from "../constants/Constants";

export const FoodItem=({
    name,
    description,
    cloudinaryImageId,
    price}
)=>{
return(
    <div>
        <img src={IMG_CDN_URL + cloudinaryImageId} />
        <h2>{name}</h2>
        <h3>{description}</h3>
        <h4>rupees(in paisa):-{price}</h4>
    </div>
)
}
