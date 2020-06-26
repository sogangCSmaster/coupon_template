import requests
import json
import pymysql
from bs4 import BeautifulSoup

conn = pymysql.connect(host="pango.ctcx8xu48fvh.ap-northeast-2.rds.amazonaws.com", user="pango", password="dbtmdwo!0303", db="coupon", charset="utf8mb4", autocommit=True)
curs = conn.cursor()

page = 1
sql = "INSERT IGNORE INTO location (market, marketSub, inspector) VALUES (%s, %s, %s)"
while True:
    if page > 47:
        break

    url = "https://nenechicken.com/17_new/sub_shop01.asp?page="+str(page)+"&ex_select=1&ex_select2=&IndexSword=&GUBUN=A"
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    infos = soup.find_all('div', {'class': 'shopInfo'})
    for info in infos:
        shopName = info.find('div', {'class': 'shopName'}).text
        shopAdd = info.find('div', {'class': 'shopAdd'}).text
        curs.execute(sql, (shopName, shopAdd, 'nene'))
    




    page += 1
    print(page)