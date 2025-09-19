import {atom} from "recoil"

export const cartState = atom({
  key: 'cartState',
  default: [],
});

export const searchState = atom({
    key:"searchState",
    default:""
})

export const authState = atom({
    key:"authState",
    default:false
})