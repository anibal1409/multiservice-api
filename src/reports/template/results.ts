export const RESULTS = `
<!DOCTYPE html>
<html>
<head>
  <title>PDF Template</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <h1>Patient Information:</h1>
  <p>First Name: {{ patient.firstName }}</p>
  <p>Last Name: {{ patient.lastName }}</p>
  <p>Email: {{ patient.email }}</p>
  <!-- Add more patient information as needed -->

  <h1>Study Information:</h1>
  <p>Stage: {{ study.stage }}</p>
  <p>Date: {{ study.date }}</p>
  <!-- Add more study information as needed -->

  <h1>Exams:</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {{#each exams}}
        <tr>
          <td>{{ exam.name }}</td>
          <td>{{ value }}</td>
        </tr>
      {{/each}}
    </tbody>
  </table>
</body>
</html>
`;
