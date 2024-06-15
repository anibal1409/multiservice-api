export const htmlTemplate = `
<html>
  <head>
    <title>Reporte DMR</title>
    <meta charset="UTF-8" />
    <style type="text/css">
      * {
        font-family: Arial, sans-serif;
      }
      .mb-2 {
        margin-bottom: 0.5rem
      }
      .image {
        width: 4rem;
        margin-right: 1rem;
      }
      .title {
        text-align: center;
        text-decoration: underline;
        font-size: 2rem;
        font-weight: 700;
        display: inline;
      }

      .image-right {
        width: 5rem;
        position: absolute;
        top: 1rem;
        right: 1rem;
      }

      .title-container {
        width: 100%;
      }
      .header-container {
        width: 100%;
      }
      .date-container {
        margin: 1rem 0;
      }

      .tg {
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 0.8rem;
      }
      td {
        padding: 0.5rem 0.75rem;
      }

      .tg td {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        word-break: break-all;
        border-collapse: collapse;
      }

      .tg th {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-weight: normal;
        overflow: hidden;
        word-break: normal;
      }

      .tg .tg-pvwk {
        background-color: #fff;
        border-color: inherit;
        text-align: left;
        vertical-align: bottom;
      }

      .tg .tg-h2a7 {
        font-weight: bold;
        text-align: center;
        vertical-align: bottom;
      }

      .tg .tg-gnn2 {
        background-color: #fff;
        border-color: inherit;
        text-align: center;
        vertical-align: bottom;
      }


    </style>
  </head>
  <body>
    <div class="header-container">
      <div class="title-container">
        <img class="image" src="{{imgSystem}}" data-iml="5230848.099999994" />
        <div class="title">REPORTE DE PUBLICACIONES</div>
        {{#ifCond imgOrg "&&" true}}
        <img
          class="image-right"
          src="{{imgOrg}}"
          data-iml="5292976.599999994"
        />
        {{/ifCond}}

      </div>
      <div class="date-container">
        <div class="mb-2">
          <strong>Fecha de emision:</strong> {{date}}
        </div>
        <div>
          <strong>Fecha de la busqueda:</strong> {{dateRange}}
        </div>
      </div>
    </div>

    <div class="table-container">


      {{#ifCond publications "&&" true}}
      <table class="tg" style="margin: auto; table-layout: fixed; width: 100%">
        {{#each publications}}
        <tbody>
          <tr>
            <td class="tg-h2a7" colspan="4">{{this.entityName}}</td>
          </tr>
          <tr>
            <td class="tg-pvwk">
              <span style="font-weight: bold">Plataforma</span>
            </td>
            <td class="tg-gnn2">{{this.platformName}}</td>
            <td class="tg-pvwk">
              <span style="font-weight: bold">Seguidores</span>
            </td>
            <td class="tg-gnn2">{{this.platformFollowers}}</td>
          </tr>
          <tr>
            <td class="tg-pvwk">
              <span style="font-weight: bold">Fecha</span>
            </td>
            <td class="tg-gnn2">{{this.platformCommentTime}}</td>
            <td class="tg-pvwk">
              <span style="font-weight: bold">Me gusta</span>
            </td>
            <td class="tg-gnn2">{{this.platformLikes}}</td>
          </tr>
          {{#ifCond link "&&" true}}
            <tr>
              <td class="tg-pvwk" colspan="4">
                <a href="{{link}}" target="_blank" >
                  {{link}}
                </a>
              </td>
            </tr>
          {{/ifCond}}
          <tr>
            <td class="tg-pvwk" colspan="4" rowspan="3">
              {{this.entityComment}}
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
        </tbody>
        {{/each}}
        </table>
      {{/ifCond}}
      {{#ifCond publications.length "==" 0}}
        No existen publicaciones registradas
      {{/ifCond}}
    </div>
  </body>
</html>
`;
