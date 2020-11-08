// lớp đối tượng chứa các phương thức giao tiếp với backend aip 
var SinhVienService = function (){
    this.layDanhSachSinhVien = function(){
        var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //backend cung cap
        method:'GET' //backend cung caasp 

        })
        return promise;
    }
    this.themSinhVien = function (){
        var promise = axios({
            url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',//api do backend cung cấp
            method: 'POST', //giao thức backend cung cấp
            data: sv
    
            })
            return promise;
    }
}