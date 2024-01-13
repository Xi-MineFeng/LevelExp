# LevelExp 等级系统

# 使用方法:​

直接丢进plugins，开服完成。
挖矿获得经验打怪一样可以获得经验(ಡωಡ)
另类的RPG

# 存储方式: 
SQLine3


# 配置文件: 
没写偷懒了(´இ皿இ｀)

​
# 命令列表:

/lvl addlevel [玩家] [等级] 添加玩家等级

/lvl setlevel [玩家] [等级] 设置玩家等级

/lvl reducelevel [玩家] [等级] 减少玩家等级

/lvl addexp [玩家] [经验] 添加玩家经验

/lvl setexp [玩家] [经验] 设置玩家经验

/lvl reduceexp [玩家] [经验] 减少玩家经验

# API对接口:

#获得等级经验(xuid)
lxl.import('LevelExp', 'LevelExp_getPlayerLevel');
lxl.import('LevelExp', 'LevelExp_getPlayerExp');

#添加等级经验(xuid, count)
lxl.import('LevelExp', 'LevelExp_addPlayerLevel');
lxl.import('LevelExp', 'LevelExp_addPlayerExp');

#设置等级经验(xuid, count)
lxl.import('LevelExp', 'LevelExp_setPlayerLevel');
lxl.import('LevelExp', 'LevelExp_setPlayerExp');

#减少等级经验(xuid, count)
lxl.import('LevelExp', 'LevelExp_reducePlayerLevel');
lxl.import('LevelExp', 'LevelExp_reducePlayerExp');



# 没有允许禁止整合和转载

​
# 图片欣赏:
