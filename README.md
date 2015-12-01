# Meteor humm package
A meteor wrapper for humm npm package [Humm node.js sdk](https://github.com/myhumm/humm-js-sdk).

Check out an example, here: [https://github.com/myhumm/humm-api-meteor-example](https://github.com/myhumm/humm-api-meteor-example)

## Installation
* `meteor add humm:humm`

## Usage

**Client:**

```javascript

        // init humm  with client_id
        humm.init({ client_id: '56570bacae8c5087411778a3' });

        //show pop up to enable user to login to hum
        humm.authViaImplicitGrant(function(error, response) {
            console.log('------------- authViaImplicitGrant complete -------------');
            console.log(error);
            console.log(response);

            //show pop up to enable user to login to hum
            humm.users.me(function(error, response) {
                console.log('------------- user.me() complete -------------');
                console.log(error);
                console.log(response);
                template.loggedViaImplicit.set(true);
                console.log(response.data_response);
                template.meViaImplicit = response.data_response;
            });
        });


```

**Server:**

```javascript

        humm.init({
            client_id: '56570bacae8c5087411778a3', client_secret: 'CdNX3TcLc/OF3k2oIogwlBi/rCZOP0LSfLxrRjoX5EA='
        });

        //get access using code
        var res = humm.accessViaCodeGrant(code);
        console.log(res);
        if(!res.error && res.data){
            //set token before request
            humm.setAccessToken(res.data.access_token);
            //request logged in user
            return humm.users.me();
        }

```


