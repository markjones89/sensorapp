export default {
    created() {
        const title = this.getTitle()

        if (title) {
            document.title = `${process.env.MIX_APP_NAME} - ${title}`
        }
    },
    methods: {
        getTitle() {
            const { title } = this.$options
            if (title) {
                return typeof title === 'function'
                    ? title.call(this)
                    : title
            }
        }
    }
}