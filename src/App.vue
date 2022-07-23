<template>
<div>
  <router-view/>
</div>

</template>
<script>
export default {
}
</script>
<style>
@import url("@/assets/reset/reset.css");
  @font-face {
   font-family: 'Droid-serif';
    src: url('fonts/ofont.ru_Droid Serif.ttf');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('fonts/Montserrat-Bold.ttf');
    font-weight: 700;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('fonts/Montserrat-Regular.ttf');
    font-weight: 400;
  }
   @font-face {
    font-family: 'Roboto';
    src: url('fonts/Roboto-Regular.ttf');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('fonts/Roboto-Medium.ttf');
    font-weight: 500;
  }
  @font-face {
    font-family: 'Moniqa';
    src: url('fonts/Moniqa-ExtraBoldItalicHeading.ttf');
    font-weight: 800;
  }
  @font-face {
    font-family: 'Radio Canada';
    src: url('fonts/RadioCanada-Medium.ttf');
    font-weight: 500;
  }
  :root{
    --blue: #0d47a1;
    --dark-grey: #495057;
    --dark-blue: #03045e;
    --dark: #0A001F;
    --green: #007f5f;
    --grey: #ADB5BD;
    --light-blue-rgb: 25, 118, 210;
    --light-blue: #1976d2;
    --light-grey: #E5E5E5;
    --purple: #401592;
    --red: #e63946;
    --red-rgb: 174, 32, 18;
    --dark-red: #ae2012;
    --white: #FFFFFF;
    --yellow: #f8961e;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background: var(--white);
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: var(--dark);
  }
  .logo {
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    color: var(--dark-grey);
    font-family: 'Moniqa';
    font-size: 38px;
    font-weight: 800;
    text-align: center;
    text-decoration: none;
    user-select: none;
  }
  .logo span {
    color: var(--blue);
  }
  a {
    outline: 0 none !important;
    border: 0;
  }
</style>
