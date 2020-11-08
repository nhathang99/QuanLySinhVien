//kết nối dữ liệu backend vào thư viện axios
//var layDanhSachSinhVienApi = function () {
    // var objectAjax = {
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //backend cung cap
    //     method:'GET' //backend cung caasp 
    // }
    // var promise = axios(objectAjax); // goij ddeens backend lay data 
    // //ham axios la ham bat dong bộ (chương trình k chạy từ trên xuống dưới, chạy nhưng thằng phía sau trươvcs)
var svService = new SinhVienService();
var layDanhSachSinhVienApi = function () {
    var promise = svService.layDanhSachSinhVien();// gọi đến backend lấy data
    //xu ly cho truong hop goi den thanh cong 
    promise.then(function(result) {
        console.log('ket qua',result);
        // lấy dữ liệu server trả về gọi hàm tạo table 
        renderTable(result.data)
    });
    // xu ly cho truong hop that bai 
    promise.catch(function(error)
    {
        console.log(error);
    });

}
var renderTable = function(mangSinhVien) {
    console.log(mangSinhVien);
    var noiDungTable='';
    for (var i=0; i< mangSinhVien.length; i++){
        // từ dữ liệu API tạo đối tượng lưu trữ 
        var sv = new SinhVien();
        sv.maSinhVien = mangSinhVien[i].maSinhVien;
        sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
        sv.diemToan = mangSinhVien[i].diemToan;
        sv.diemLy = mangSinhVien[i].diemLy;
        sv.diemHoa = mangSinhVien[i].diemHoa;
        sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien = mangSinhVien[i].loaiSinhVien;
        sv.email = mangSinhVien[i].email;
        console.log();
        // tạo các tr chương thông tin sinh viên tương ứng 
        noiDungTable +=`
            <tr>
            <td>${sv.maSinhVien}</td>
            <td>${sv.tenSinhVien}</td>
            <td>${sv.email}</td>
            <td>${sv.tinhDiemTrungBinh()}</td>
            <td>${sv.xepLoai()}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
            <button  class="btn btn-primary" onclick="suaSinhVien('${sv.maSinhVien}')">Chỉnh sửa</button>
            </td>
            </tr>`;
            
    }
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}
layDanhSachSinhVienApi();
//chức năng thêm sinh viên lưu trữ vào server thông qua gọi api backend 
document.querySelector('#btnXacNhan').onclick = function(){
    var sv = new SinhVien;
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa= document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    // console.log('sinh viên',sv);
    // dùng axios đứa dữ liệu về server thông qua api backend 
    // var promise = axios({
    //     url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',//api do backend cung cấp
    //     method: 'POST', //giao thức backend cung cấp
    //     data: sv // dữ liệu gửi đi (lưu ý dữ liệu phải đi đúng format dữ liệu của backend yêu cầu)
    // });
    var promise = svService.themSinhVien(sv);
    //hàm thực thi khi gọi ajax thành công 
    promise.then(function(result){
        console.log(result.data);
        //render lại table 
        layDanhSachSinhVienApi();
    });
    promise.catch(function(error) {
        console.log(error.response.data);
    });

}
// chức năng xóa sinh viên server dựa vào api backend
var xoaSinhVien = function (maSinhVien) {
    // alert(maSinhVien);
    var promise = axios ({
        url:`http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=
        ` + maSinhVien,
        method: 'DELETE',
    })
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    })
    // lấy dữ liệu thất bại 
    promise.catch(function(error){
        console.log(error.response.data);
    })
}   
//chức  nắng sửa 
var suaSinhVien = function (maSinhVien){
    // alert(maSinhVien);
    var promise = axios({
        url:`http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=`
        + maSinhVien,
        method:'GET'
    });
    promise.then(function (result) {
        console.log(result.data);
        
        //gán dữ liệu server trả về lên giao diện người dùng nhập thông tin 
        var sv = result.data;
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#loaiSinhVien').value =sv.loaiSinhVien ;
        sv.diemToan = document.querySelector('#diemToan').value;
        sv.diemLy = document.querySelector('#diemLy').value;
        sv.diemHoa= document.querySelector('#diemHoa').value;
        sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
        sv.email = document.querySelector('#email').value;
    });
    // lấy dữ liệu thất bại 
    promise.catch(function(error){
        console.log(error.response.data);
    })
}
// chức năng lưu thông tin sinh viên dựa vào api backend cung cấp 
document.querySelector('#btnLuuThongTin').onclick = function (){
    // lấy dữ liệu từ người dùng nhập đưa vào đối tượng dữ liệu backend yêu cầu 
    var sv = new SinhVien;
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa= document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    // gọi ajax đưa dữ liệu về server cập nhật 
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='
        +maSinhVien,
        method:'PUT',
        data:sv
    })
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    })
    // lấy dữ liệu thất bại 
    promise.catch(function(error){
        console.log(error.response.data);
    })
    
    
    // tạo đối tượng viết tắt 
    // var sinhVienCapNhat =
    // {
    //     "maSinhVien": document.querySelector('#maSinhVien').value,
    //     "tenSinhVien": "string",
    //     "loaiSinhVien": "string",
    //     "diemToan": 0,
    //     "diemLy": 0,
    //     "diemHoa": 0,
    //     "diemRenLuyen": 0,
    //     "email": "string"
    //   }
}