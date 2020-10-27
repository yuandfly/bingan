export default {
    focus(str, n) {
        let name = "";
        if (str === "tjm4003") {
            if (n < this.fromData.domains.length - 1) n++;
            else n = 0;
        }
        name = str + n;
        this.$refs[name].focus();
    },
    moveRight(str, n) {
        console.log(str, n);
        let name = "";
        name = str + n;
        this.$refs[name].focus();
    },
    moveLeft(str, n) {
        let name = "";
        name = str + n;
        this.$refs[name].focus();
    },
    moveUp(str, n) {
        let name = "";
        if (n > 0) {
            name = str + String(n - 1);
        } else {
            name = str + n;
        }
        this.$refs[name].focus();
    },
    moveDown(str, n) {
        let name = "";
        if (n < this.fromData.domains.length - 1) {
            name = str + String(n + 1);
        } else {
            name = str + n;
        }
        this.$refs[name].focus();
    },
}