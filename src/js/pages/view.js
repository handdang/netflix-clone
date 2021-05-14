//코드 중복 방지 위해 여기 공통으로 사용하는 함수 관리
class View {
    constructor (attr){
        this.$element = this._createElement(attr);
        // _쓰는 이유 : 내보내지 않아야 할정보들 프라이빗한 소스
    }
    _createElement(attr){
        const div = document.createElement('div');
        // div.innerHtml = attr.innerHtml;
        // div.className = attr.className;
        // 를 for문 돌려서 
        if(attr){
            const keys = Object.keys(attr)
            keys.forEach((key)=>{
                div[key] = attr[key];
            })
            // for(const key of Object.entries(attr)){
            //     div[key] = attr[key];
            // }
        }
        
        return div;
    }
}
export default View;