import { APIService } from './apiService';

export class DataService{
  constructor(){
    this.api = new APIService();
  }
  submitHotlist(data){
    console.log('data to submit: ',data)
    return new Promise((res,rej)=>{
      this.api.post('info/new_hotlist',data).then((resp)=>{
        console.log('success posting! ',resp.data);
        res(resp.data);
      })
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }
  getAdminInfo(footerLogoEdit = null){
    return new Promise((res,rej)=>{
      this.api.get('info/admin_info').then((admin)=>{
        console.log('our admin info: ',admin.data);
        const d = admin.data[0];
        res({
          host_password:d.host_password,
          guest_password:d.guest_password,
          admin_password:d.admin_password,
          hotlist_password:d.hotlist_password,
          agenda:d.agenda,
          //after_tour:d.after_tour,
          //after_tour_va:d.after_tour_va,
          //after_tour_md:d.after_tour_md,
          event_date:d.event_date,
          slots_avail:d.slots_available,
          logo:d.logo_url,
          footer_logo_url:d.footer_logo_url,
          next_tour:d.next_tour,
          footer_logo_edit:(footerLogoEdit != null) ? footerLogoEdit(d.footer_logo_url) : null
        })
      }).catch((err)=>{
        console.log('err - ',err);
      });
    })
  }
  addAgendaItem(data){
    return new Promise((res,rej)=>{
      this.api.post('info/add_agenda_item',data).then((agenda)=>
      {
        res(agenda.data);
      });
    });
  }
  updateAgendaItem(id,data){
    return new Promise((res,rej)=>{
      this.api.post('info/update_agenda_item/'+id,data).then((agenda)=>{
        console.log('updated agenda: ',agenda);
        res(agenda.data);
      }).catch((err)=>{
        console.log('err - ',err);
      })
    })
  }
  getAgendaInfo(){
    return new Promise((res,rej)=>{
      this.api.get('info/agenda_items').then((agenda)=>{
        console.log('our agenda in dataservice: ',agenda);
        res(agenda.data);
      }).catch((err)=>{
        console.log('err -',err);
      })
    });
  }
  getAfterTour(type){
      return new Promise((res,rej)=>{
        this.api.get(`info/${type}`).then((after_tour)=>{
          console.log('our after tour info: ',after_tour);
          after_tour = after_tour.data;
          res({
              [type]:after_tour
            })
        }).catch((err)=>{
        console.log('err - ',err);
      });
    })
  }
}
