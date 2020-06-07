import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import * as jsPDF from 'jspdf';

import 'jspdf-autotable';

// const TOTAL_PAGES = 7;

// export class NewsPost {
//   title: string;
//   link: string;
//   creator: string;
//   text: string;
// }

@Injectable()
export class ReportsService {
  public organizationData;

  constructor(private http: HttpClient) {

    this.loadOrganization();

  }

  public baseUrl = environment.baseUrl;

  loadVehicles(){
    return this.http.get(this.baseUrl+"/reports/getReports");
  }

  loadFuelHistory(){
    return this.http.get(this.baseUrl+"/reports/getFuelHistory");
  }


  loadIssues(){
    return this.http.get(this.baseUrl+"/reports/getIssues");
  }

  loadContacts(){
    return this.http.get(this.baseUrl+"/reports/getContacts");
  }



  loadAssignVehicles(){
    return this.http.get(this.baseUrl+"/reports/assign_vehicles");
  }

  loadVehicleServices(){
    return this.http.get(this.baseUrl+"/reports/vehicle_services");

  }

  loadOrganizationData(){
    return this.http.get(this.baseUrl+"/organization/");
  }


  loadServiceTaskData(){
    return this.http.get(this.baseUrl+"/reports/vehicle_services");

  }


  loadVehicleExpenses(){
    return this.http.get(this.baseUrl+"/reports/vehicle_expenses");

  }


  // loadServiceTypeDataForGraph(){
  //   return this.http.get(this.baseUrl+"/reports/vehicle_services");

  // }

  loadServiceReportGraphData(){
    return this.http.get(this.baseUrl+"/reports/serviceTypeGraph");

  }


  loadExpenseSummaryChartData(data){
    return this.http.post(this.baseUrl+"/expenses/vehicleExpensesbyVehicle/",data);
  }

  downloadPdfFile(reportTitle, reportFileName, head, bodyData, myTableHtml?){

    const doc = new jsPDF('p','mm', 'a2')
    doc.autoTable({ 
      html: '#my-table',
    });
    let totalPagesExp = doc.internal.getNumberOfPages();
    //console.log(this.organizationData);
    let logo = this.organizationData.logobase64;
    console.log(logo);
    //let base64img = this.getBase64Image(this.organizationData.organizationLogo);
    // console.log(base64img);
    let organizationName = this.organizationData.organizationName;
    let todayDateTime = this.todayDateTime();


    let optData = {
      head: [head],
      body: bodyData,
      margin: {
        top: 200,
    },
      startY: 45,
      didDrawPage: function(data) {
      
        // Header
       // doc.setFontSize(15);
        // doc.setTextColor(40);
        // doc.setFontStyle('normal');
        // if (base64Img) {
        //   doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        // }
        doc.addImage(logo, 'PNG', data.settings.margin.left+150, 5, 0, 0);


        // doc.text(logo, data.settings.margin.left + 80, 8);
        // doc.text(organizationName, data.settings.margin.left + 80, 8);


        // doc.addImage(logo, 'PNG', 15, 40, 200, 114);

        doc.setFontSize(16);
        doc.setTextColor('#C2CC7F');
        doc.setFontStyle('normal');
        // if (base64Img) {
        //   doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        // }
        doc.text(reportTitle, data.settings.margin.left+0, 25, 0, 0,'left');
        

        
        doc.setFontSize(14);
        doc.setTextColor(80);
        doc.setFontStyle('normal');
        doc.text(todayDateTime, doc.internal.pageSize.width, 25, null, null, 'right',)

        // Footer
        var str = "Page " + doc.internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(8);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      }

    };

 

  doc.autoTable(optData)

  doc.save(reportFileName);



  }

downloadFile(data, filename='data', columns) {
      let csvData = this.ConvertToCSV(data, columns);
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = 'S.No,';

      for (let index in headerList) {
          row += headerList[index] + ',';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
      for (let i = 0; i < array.length; i++) {
          let line = (i+1)+'';
          for (let index in headerList) {
              let head = headerList[index];

              line += ',' + array[i][head];
          }
          str += line + '\r\n';
      }
      return str;
}

  public loadOrganization(){
    this.loadOrganizationData().subscribe((d)=>{
      console.log(d);
       this.organizationData = d["data"];
      // console.log(this.organization);
    },(error)=>{

    });
  }

  todayDateTime(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime;

  }



  
}
