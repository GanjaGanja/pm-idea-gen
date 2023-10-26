<template>
    <div>
        <h1>Index page</h1>
          <p>
              This is the index page. It uses the default layout, which means it will
              render inside the <code>&lt;slot&gt;</code> of the default layout.
          </p>
          <VTextField label="Text field" />
    </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
</script>
