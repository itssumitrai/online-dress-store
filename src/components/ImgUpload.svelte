<script>
    export let previewUrl;
    export let index = 0;
    export let title = 'Image';
</script>
<div>
    <label><span>{title}:</span><input type="file" name={`image${index > 0 ? index + 1 : ''}`} index={index}></label>
    <img src={previewUrl} alt="" class="imagePreview"/>
</div>
<style>
    .imagePreview {
        width: 100px;
    }
</style>