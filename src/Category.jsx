import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSoup } from "react-icons/tb";
import { CiBowlNoodles } from "react-icons/ci";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import { GiHamburger } from "react-icons/gi";


const Categories =[
  {
    id : 1,
    name : 'All',
    icon : <TiThSmallOutline size={'45px'} color="orange"/>, 
  },
  {
    id : 2,
    name : 'Breakfast',
    icon : <MdOutlineFreeBreakfast size={'45px'} color="orange" />, 
  },
  {
    id : 3,
    name : 'Soups',
    icon : <TbSoup size={'45px'} color="orange"/>, 
  },
  {
    id : 4,
    name : 'Pasta',
    icon : <CiBowlNoodles size={'45px'} color="orange"/>, 
  },
  {
    id : 5,
    name : 'Main dish',
    icon : <MdOutlineFoodBank size={'45px'} color="orange"/>, 
  },
  {
    id : 6,
    name : 'Pizza',
    icon : <GiFullPizza size={'45px'} color="orange"/>, 
  },
  {
    id : 7,
    name : 'Burger',
    icon : <GiHamburger  size={'45px'} color="orange"/>, 
  }
]


export default Categories;