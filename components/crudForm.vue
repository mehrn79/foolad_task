<template>
    
        <DxEditing
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        mode="popup"
      >
        <DxPopup
          :show-title="true"
          :width="700"
          :height="525"
          title="product info"
        />
        <DxForm>
          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
          >
            <DxItem data-field="category"/>
            <DxItem data-field="title"/>
            <DxItem data-field="brand"/>
            <DxItem data-field="description"/>
            <DxItem data-field="price"/>
            <DxItem data-field="discountPercentage"/>
            <DxItem data-field="rating"/>
          </DxItem>
        </DxForm>
      </DxEditing>
    
</template>

<script>
    import { DxItem } from 'devextreme-vue/form';
    import {
        DxEditing,
        DxPopup,
        DxForm,
    } from 'devextreme-vue/data-grid';

    export default {
        name:'CrudForm',
        components: {
            DxItem,
            DxEditing,
            DxPopup,
            DxForm
        },
    }
</script>

<style lang="scss" scoped>

</style>