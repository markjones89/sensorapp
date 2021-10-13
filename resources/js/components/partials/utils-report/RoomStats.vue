<template>
    <div class="room-stats">
        <h2>{{ name }}</h2>
        <table></table>
        <div class="container">
            <div class="row">
                <div class="col col-6">
                    Pie chart here....
                </div>
                <div class="col col-6">
                    Bar chart here....
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        stats: {
            type: Object,
            required: true
        }
    }
}
</script>