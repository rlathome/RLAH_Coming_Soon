import { APIService } from './apiService';

export class DataService{
  constructor(){
    this.api = new APIService();
  }
  getAdminInfo(footerLogoEdit){
    return new Promise((res,rej)=>{
      this.api.get('info/admin_info').then((admin)=>{
        console.log('our admin info: ',admin.data);
        const d = admin.data[0];
        res({
          host_password:d.host_password,
          guest_password:d.guest_password,
          admin_password:d.admin_password,
          agenda:d.agenda,
          after_tour:d.after_tour,
          after_tour_va:d.after_tour_va,
          after_tour_md:d.after_tour_md,
          event_date:d.event_date,
          slots_avail:d.slots_available,
          logo:d.logo_url,
          footer_logo_url:d.footer_logo_url,
          next_tour:d.next_tour,
          footer_logo_edit:footerLogoEdit(d.footer_logo_url)
        })
      }).catch((err)=>{
        console.log('err - ',err);
      });
    })
  }
}
