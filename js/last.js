(function () {
    class But {
        constructor(elem, done) {
            this.element = elem;
            this.done = done;
        }
        bindAc() {
            // console.log(x.element.length);
            //获取点击信息
            switch (this.element.length > 1) { // 判断传入的文本节点的长度
                case true:
                    for (let i = 0; i < this.element.length; i++) {
                        this.element[i].onclick = this.done; // 遍历元素添加点击事件
                    }
                    break;
                default:
                    this.element[0].onclick = this.done;
            }
        }

        unBind() {
            //删除点击信息
            switch (this.element.length > 1) { // 判断传入的文本节点的长度
                case true:
                    for (let i = 0; i < this.element.length; i++) {
                        this.element[i].onclick = null; // 循环解绑点击事件
                    }
                    break;
                default:
                    this.element[0].onclick = null;
            }
        }
    }

    function showNumAndSave(s) {
        //显示和保存输入信息
        let self = s;
        Screen.innerHTML += self.innerHTML;
        //显示
        if (Screen.clientWidth > 280) {// 判断输入的数字长度是否超出长度
            BackspaceBut.done();
            alert("is overflow");
        }
        isArr.push(self.innerHTML);
        //保存
    }

    function numDone() {
        switch (this.innerHTML) {
            case 0:
                //如果第一次点击的是0 的话 不做任何操作
                if (this.innerHTML == 0 && (isArr.length == 1 && isArr[0] == 0)) {
                    break;
                }
                showNumAndSave(this);
                break;
            case ".":
                //1.当点击的是小数点时候 如果屏幕中只有0的话直接进行拼接 然后将小数点压入数组
                //2.小数点的拼接只能在前一位置是数字的时候
                if (isArr.length == 1 && isArr[0] == "0") {
                    showNumAndSave(this);
                } else if (!isNaN(isArr[isArr.length - 1])) {
                    showNumAndSave(this);
                }
                break;
            default:
                if ((isArr.length <= 1) && (isArr[0] == "0")) {
                    Screen.innerHTML = this.innerHTML;
                    isArr.push(this.innerHTML);
                    isArr.shift();
                } else {
                    showNumAndSave(this);
                }
        }
    }

    function operaDone() {
        //保存运算符
        if (!isNaN(isArr[isArr.length - 1]) && (isArr.length >= 1 && isArr[0] != 0)) {
            showNumAndSave(this);
        }
        // else if(isArr[0] == 0){
        //     if(isArr[isArr.length - 1]=='/' && isArr.length == 1){
        //         alert("0不能做被除数！！")
        //         console.log(isArr);
        //     }
            // else if(isArr.length==1){
        //         break;
        //     }else if(){
        //         showNumAndSave(this);
        //     }
        }
    }

    function equalDone() {
        Screen.innerHTML = eval(Screen.innerHTML);
        //计算屏幕中显示的数据
        isArr[0] = 0;
        isArr.length = 1;
        for (let i = 1; i < Screen.innerHTML.length; i++) {
            isArr.push(Screen.innerHTML[i]);
        }
    }

    function clearDone() {
        //清空全部
        isArr[0] = 0;
        isArr.length = 1;
        Screen.innerHTML = 0;
        isArr.push(Screen.innerHTML);
    }

    function backspaceDone() {
        //退一格
        if (isArr.length == 1) {
            Screen.innerHTML = 0;
            isArr[0] = 0;
        } else {
            Screen.innerHTML = Screen.innerHTML.slice(0, -1);
            isArr.pop();
        }
    }

    function swiDone() {
        flag = flag ? 0 : 1;
        let node = this.firstElementChild;
        // console.log(node);
        //保存当前状态的第一个子节点
        if (flag == 0) {
            removeClass(node, 'anmate-in');
            addClass(node, 'anmate-out');
            setTimeout(() => { Screen.innerHTML = '' }, 300);
            node.innerHTML = 'down';
        } else {
            removeClass(node, 'anmate-out');
            addClass(node, 'anmate-in');
            setTimeout(() => { Screen.innerHTML = 0 }, 300);
            node.innerHTML = 'work';
        }
        init();
    }

    function addClass(node, name) {
        if (node.className.search(name) !== -1) {
            return
        } else {
            node.className = `${node.className} ${name}`;
            //设置class="on anmate-out"/class="on anmate-in"
            console.log(node.className);

        }
    }

    function removeClass(node, name) {
        let className = node.className;
        if (className.search(name) !== -1) {
            let nameArr = className.split(' ')
            nameArr.pop();
            console.log(nameArr)
            node.className = nameArr.join(' ');
        }

    }

    function init() {
        switch (flag) {
            case 1:
                //计算器工作状态
                NumButs.bindAc()
                //获取按钮点击的数字信息
                OperatorButs.bindAc()
                //获取运算符点击的按钮信息
                EqualBut.bindAc()
                //获取结果点击的按钮信息
                ClearBut.bindAc()
                //获取清空全部的按钮信息
                BackspaceBut.bindAc()
                //获取退一个的按钮信息
                SwiBtn.bindAc();
                //获取开关点击的按钮信息
                break;

            case 0:
                //计算器关闭状态
                NumButs.unBind()
                OperatorButs.unBind()
                EqualBut.unBind()
                ClearBut.unBind()
                BackspaceBut.unBind()
                break
        }

    };

    let isKeys = document.getElementsByClassName("keys")[0];  // 获取数字和运算符按钮
    let num = isKeys.getElementsByClassName("but"); // 获取数字按钮文本节点对象
    let operator = isKeys.getElementsByClassName("operator"); // 获取运算符文本节点对象
    let equal = isKeys.getElementsByClassName("equal"); // 获取等于文本节点对象
    let clear = document.getElementsByClassName("clear"); // 获取清除文本对象对象
    let backspace = document.getElementsByClassName("backspace");  // 获取回撤文本节点对象
    let Screen = document.getElementsByClassName("screen")[0].firstElementChild; // 获取屏幕对象
    let isArr = [Screen.innerHTML]; // 建立一个数组用来实时储存屏幕上的数字
    isArr[0] = 0;
    let swi = document.getElementsByClassName("switch");//获取开关计算器对象
    let flag = 1;
    let NumButs = new But(num, numDone);
    let OperatorButs = new But(operator, operaDone);
    let EqualBut = new But(equal, equalDone);
    let ClearBut = new But(clear, clearDone);
    let BackspaceBut = new But(backspace, backspaceDone);
    let SwiBtn = new But(swi, swiDone);

    init();
})();
