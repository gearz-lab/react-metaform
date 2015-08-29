export default {
    /**
     * Returns the style due to the visible state
     */
    getVisibleStyle: function() {
        var invisible = this.props.invisible;
        if(invisible) {
            return 'hide';
        }
        return '';
    }
}