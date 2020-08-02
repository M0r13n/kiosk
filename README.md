# Simple Carousel that loops through some images

You can use it with a raspberry pi in fullscreen mode to display some images.

### Break Mode
There is also a break mode. Therefore you can set the **shop** url query parameter to some shop and save this url.

The raspi will then query some API every **15** seconds and check if it should display a countdown.

For this to work you need to provide the data via JSON. 

The Raspi expects then queries that API. It expects the following JSON:

```json
{
  "last_break": {
    "created_at": "2020-08-02T16:34:09.681096",
    "duration": 1800,
    "is_over": false,
    "shop": "<YOUR_SHOP_NAME>",
    "until": "2020-08-02T17:04:09.681096"
  },
  "shop": "<YOUR_SHOP_NAME>"
}
```

where `<YOUR_SHOP_NAME>` is the name that you set in the url query param.

Adjust `utils.js` and set the `BASE_URL` according to your setup.
