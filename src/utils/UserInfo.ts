import { RegionInputModel } from 'v-region';
import { ref } from 'vue';

export interface FullUserInfo {
  user_id: string;
  name: string;
  age: string | number;
  gender: string;
  type: string;
  tel: string;
  email: string;
  region: RegionInputModel;
  detailAdd: string;
  user_pic: string;
}


export interface EditUserInfo {
  user_id: string;
  tel: string | null;
  email: string | null;
  region: RegionInputModel;
  detailAdd: string |null;
}

export const thisFullUserInfo = ref<FullUserInfo>({
  user_id: '',
  name: '',
  age: '',
  gender: '',
  type: '',
  tel: '',
  email: '',
  region:{
    province: '',
    city: '',
    area: '',
    town: ''
  },
  detailAdd: '',
  user_pic: ''
});

export const thisEditUserInfo = ref<EditUserInfo>({
  user_id: '1111111111111',
  tel: '',
  email: '',
  region: <RegionInputModel>{
    province: '',
    city: '',
    area: '',
    town: ''
  },
  detailAdd: ''
});