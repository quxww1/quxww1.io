<template>
    <div>
        <div class="title">
          000

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        if(this.$route.query.origin == 'play') return;
        document.body.removeChild(document.getElementById("loading"));
    }
}
</script>
<style lang="scss" scoped>
.title{
    font-family: $cn;
}
</style>

