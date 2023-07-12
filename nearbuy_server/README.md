#### Handle errors using zod

To send the zod error object in the error response body add `err.issues[0]`.

#### Endpoints

`````
/register - POST
Content-type: application/json
{
  email: string;
  password string
}
`````
