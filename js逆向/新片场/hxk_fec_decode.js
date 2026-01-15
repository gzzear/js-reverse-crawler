const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require("fs");

//大数组
function a0_0x56fd(){return["uwL4rNq","v2LUzg93CYbqAg9Uzq","A0zUzLy","y3b1q2XHC3nlzxK","z2v0sgfZtgLLzfjLC29SDxrPB24","D2LU","su1QCLm","mxWWFdn8mNW0","mtfWDcbbCMLHBa","yxjmvM4","sKnzs0W","Bw91C2vKB3DU","uMvHBfzPzgvVlLjLywXwAwrLBYH0BsKGqwn0AxzLwcbdB250CM9SicGZmI1IAxqP","yxr0CMLIDxrLihzLyZiGyxr0CLzLCNrLEdT2yxj5Aw5NihzLyZiGDMfYEwLUvgv4q29VCMrPBMf0ztT1BMLMB3jTihzLyZiGDw5PzM9YBu9MzNnLDdT2B2LKig1HAw4OkxT2yxj5Aw5uzxHdB29YzgLUyxrLpwf0Dhjwzxj0zxGRDw5PzM9YBu9MzNnLDdTNBf9qB3nPDgLVBJ12zwm0kgf0Dhjwzxj0zxGSmcWXktT9","Edy0uM90Ba","D2vIz2WGC3rLBMnPBcbIAxrZoG","o1nHBwvtAxrLpu5VBMu7u2vJDxjLo1bHCNrPDgLVBMvK","D3nFCMvMzxjYzxjFzgvSzxrL","Dw5RBM93BG","yw5KCM9Pza","z2v0sxrLBq","Aw9XAK0","B3rOzxiGzhjPDMvYigvYCM9Y","Edy0tgvMDfnOAwz0","wxjkqvq","DNPfq3O","A1bLufK","AgfZsw5KzxHLzerc","ywrKrxzLBNrmAxn0zw5LCG","D2vIz2WGDMvYDgv4ihnOywrLCIbSB3CGzMXVyxqGChjLy2LZAw9UihjHBMDLtwf4oG","vezNtKO","i0voq09eruqJ","z2v0suvqBhvNAw5Z","vKvore9s","tg9qsgS","C2XPy2u","mxW0Fdb8mNWZ","BLjgwKS","ywXSB3Dty3jPChrby2nLC3m","y3jLyxrLrwXLBwvUDa","DwXlCfG","qw5KCM9Pza","u1rftKnjtf9csvrt","Bg9JywXtDg9YywDLs2v5","zhnACvm","AhrTBa","zxHJBhvKzufKqMXVy2S","C2HHzgvYu291CMnL","AwvFD2vIzhjPDMvY","BMf0AxzLrM9YrwfJAa","wgrRAfy","CgHHBNrVBwPZ","zxHJBhvKzurVtM90vhjHy2S","CgLRzq","nda1odrKreHrqLe","Bg9N","DeDvsfG","CKjQCvq","uMj4r2e","zxHJBhvKzvrPBwv6B25Lt2zMC2v0","vKvsu0LptG","D2vJAgf0","y3bdEuW","B3zOrNe","C2P4Dgq","nZjWEa","t0jNEeW","DxnLCKXHBMD1ywDL","wuPZB0e","ogfIy1jAtq","C3DMq29UDgfPBMvYswq","BxnPzq","Ag5fyKW","B0Hqs1O","DwTsAg8","CLnzrfu","ptSGCgf0Ad0VoYbLEhbPCMvZpvrODsWGmdeGsMfUide5nZaGmda6mda6mdaGr01uo1nLy3vYztTqyxj0AxrPB25Lza","y3jLyxrLuhjVz3jHBq","tuvesvvnx0zmt0fu","mtfWDcbUBY1YzwfSlwzVBNqTmtiZ","yxr0CLzLCNrLEa","zxHJBhvKzvnJCMvLBLjLC29SDxrPB24","rhzZq2e","nhWZFdz8mhWXFdv8mG","D2fYBG","ntmZoda3m3nfyLnpua","qLrtA0i","y3jHy2TuExbLrgv0zwn0igvYCM9Y","ohW5Fdj8mtb8n3WWFdv8nNW0Fdn8mtf8mq","y29TBw9Uq2HLy2SGzxjYB3i","y29VA2LL","ywnir28","D2vIz2WGzNjHz21LBNqGC2HHzgvYigXVDYbPBNqGChjLy2LZAw9UihjHBMDLtwLUoG","z2v0q29UDgv4Def0DhjPyNv0zxm","CNfRBxe","D2vIz2WGBwf4ignVBwjPBMvKihrLEhr1CMuGAw1Hz2uGDw5PDhm6","zxHJBhvKzvbPEgvSuMf0Aw8","D2vIz2WGzNjHz21LBNqGC2HHzgvYigHPz2GGzMXVyxqGChjLy2LZAw9UoG","zgnLtwG","mxW0Fdz8nxWZFdb8mG","yw4T","DKDPt28","C2vSzw5PDw1dAgvJAYbLCNjVCG","zMLSBa","DgvZDa","tufyx0nvqKvFtufqx1rfwfrvuKvFu0LArq","AxbHza","wLjPANy","u3H4yve","tufyx0zsquDnru5ux1vosuzpuK1FvKvdve9suW","D2vIz2WGDMvYC2LVBJO","D05XufK","Aw5KzxHLzerc","B2vHqvy","r2HIyLa","zxHJBhvKzunVBg9YrgvWDgG","D2vIz2WGzNjHz21LBNqGC2HHzgvYigXVDYbMBg9HDcbWCMvJAxnPB24GCMfUz2vnyxG6","AMHly3G","z3fWD3u","y3jLyxrLqNvMzMvY","q0TLshm","rMvir0q","zxPlqwq","rxjYB3iGAw4GC2v0rMLUz2vYuhjPBNq6","te9xx0Lova","zxHJBhvKzu9Wzw5eyxrHyMfZzq","BLzVvM4","z2v0uMvNDwXHCLbSDwDPBNm","x3DPBG","vg91y2HfDMvUDa","qM90lvnLy3vYAxr5lvjLCxvLC3qTv2L0Ac1uywC","EfDWz2q","m3W3Fdf8nhWWFdv8mNW2","y29TvxjS","sw50zxjUzxqGrxHWBg9Yzxi","s3jWwMy","rNzoAvq","y2fJAgvF","AgfZtgLLzfjLC29SDxrPB25lzxK","Edy0txvSDgLWBhK","ndqWChv6D2rg","rxjYB3iGAw4Gz2v0u2vYDMLJzunVB2TPztO","A2v5zg93BG","Edy0qwrK","z2v0vw5PzM9YBuXVy2f0Aw9U","DM5Sz04","D2vIz2WGBwf4igzYywDTzw50ihvUAwzVCM0GDMvJDg9YCZO","swnRvuW","wg5jy1K","nhW1Fdf8m3WYFda","y29SB3jezxb0Aa","END4EMS","q1Hysuq","yvvhtgG","tufyx1zbuLLjtKDFvKvdve9suW","Bfvmz3q","rxjYB3iGAw4GDgvYBwLUywXfDMvUDenVDw50oG","D2vIz2WGzNjHz21LBNqGC2HHzgvYigHPz2GGzMXVyxqGChjLy2LZAw9UihjHBMDLtwf4oG","twLJCM9ZB2z0ieLUDgvYBMv0iev4CgXVCMvY","zxjYB3i","D2vIz2WGBwf4ihzHCNLPBMCGDMvJDg9YCZO","D2vIz2WGzNjHz21LBNqGC2HHzgvYig1LzgL1BsbPBNqGChjLy2LZAw9UoG","CKjiEgi","m3W0Fdj8mhW1Fde","uerglLbKzKn0CMW","D2vIz2W","y2HYB21L","B3bLCMe","BNvTsxrLBxm","D2vIz2WGDMvYDgv4ihnOywrLCIbTzwrPDw0GAw50ihbYzwnPC2LVBIbYyw5Nzu1PBJO","CxfIu1e","C2vYAwy","D2vIz2WGyMX1zsbIAxrZoG","C2vSzw5PDw0TAwrLlwLUzgLJyxrVCG","D2vIz2WGzNjHz21LBNqGC2HHzgvYigXVDYbMBg9HDcbWCMvJAxnPB246","Axnjrq","vfzVELm","tLzvzwG","uvrzueu","EwfHrNe","te9xx0zmt0fu","qKjiuwS","y29UC29Szq","Axndyw52yxntDxbWB3j0zwq","suPQwee","tvjVDwC","D2vIz2WGBwf4ihjLBMrLCIbIDwzMzxiGC2L6ztO","z2v0vgLTzq","rfHlDfi","D2vIz2WGzgvWDgGGyML0CZO","D2vIz2WGzNjHz21LBNqGC2HHzgvYigHPz2GGAw50ihbYzwnPC2LVBIbYyw5Nzu1HEdO","t2PUDhK","tufyx0nptujjtKvex1rfwfrvuKvFsu1br0vFvu5jvfm","zgvUAwvK","z05iANe","DMvYDgv4ug9ZqxjYyxK","D2vIz2WGDMvYDgv4ihnOywrLCIbTzwrPDw0GAw50ihbYzwnPC2LVBIbYyw5Nzu1HEdO","B3jfwuS","B3bY","D2vIz2WGDMvYDgv4ihnOywrLCIbTzwrPDw0GzMXVyxqGChjLy2LZAw9UihjHBMDLtwf4oG","Bg9JywXtDg9YywDL","u2HLBgWUvuLizwXWzxi","C2vZC2LVBLn0B3jHz2u","zxHJBhvKzuLfugX1z2LUCW","zxHJBhvKzvnLC3nPB25tDg9YywDL","uenerMG","C2vUza","o1nLy3vYzq","CMDIkdi1nsWWldi1nsK","AK5Hz2W","D21WBgf5zxiUB2n4","ywrKrxzLBNrZ","qufjDha","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","zfDbu1y","rMPJB1C","ywmT","BwvUDq","Aw5MBW","zxHJBhvKzvbSDwDPBNm","Awrxr0G","qK1jD20","zwLkAuS","sKfODvO","Aw5KzxHpzG","zM53Ee0","q0j3CfO","zxHJBhvKzuHHC0XPzwrmyw5NDwfNzxm","zxH0zw5ZAw9UCZO","z2jhrgS","CLPcrhi","B3vbvMy","Bvfiq2W","r1jfru5FqKLuuW","tKTNwMy","Cg9ZAxrPB24","Agzcz0u","vKnLywK","u2fMyxjP","qNjyCK0","CgzLrfO","D2vIz2WGDMvYDgv4ihnOywrLCIbSB3CGAw50ihbYzwnPC2LVBIbYyw5Nzu1HEdO","zunRDfq","revqveHFqLvgrKvsx0jjva","C2fUCY1ZzxjPzG","AgvHzgXLC3m","wLr6tfK","Au9t","tLjUs3u","Aw5UzxjizwLNAhq","z2v0sgfZtgLLze9Z","ChjVBxb0","rfHfsKW","uKHXuuS","yLrwCem","Edy0wg9Y","D2vIz2WGDMvYDgv4ihnOywrLCIbOAwDOigzSB2f0ihbYzwnPC2LVBJO","v2vIr0Xszw5KzxjPBMDdB250zxH0","y0rUu3m","yNvMzMvYrgf0yq","BK9SAui","u2HVy2T3yxzLrMXHC2GUu2HVy2T3yxzLrMXHC2G","DNHry1q","Bwf0y2G","mJaWmZaXmdC","zxHJBhvKzuf2ywLSywjSzvnJCMvLBLjLC29SDxrPB24","tufyx1zfuLrfwf9vtKLgt1jnx1zfq1rpuLm","y2vPBa","Dg9mB3DLCKnHC2u","BgfUz3vHz2u","mtqYmtjrAefdrgy","D2vIz2WGDMvYDgv4ihnOywrLCIbOAwDOigLUDcbWCMvJAxnPB246","ueTPz0S","mxWWFdr8mNWZ","zhnHqwS","yNH4sM0","quXjqvnfrf9msu5fx1Djrfrix1jbtKDf","CgX1z2LUC0TLEq","rKXpqvq","n3LOCwzQCW","yxvKAw9dB250zxH0s2v5","s3fqBfm","zMLYzwzVEa","DMvYDgv4qxr0CMLIug9PBNrLCG","zxHJBhvKzuHHC0XPzwrcCM93C2vY","svDzzgy","tufyx1zfuLrfwf9urvHuvvjfx0LnquDfx1vosvrt","yvPxtMS","qLHmvfe","BhrRBuW","yNjVD3nLCKXHBMD1ywDL","rxPZv04","t2HNu24","EuDcuK4","uxrYsxy","Dgv4DenVBNrLBNq","y29UC29SzsbKzxrLy3qGzxjYB3i","ywXWAgfIzxrPyW","BM9Uzq","tM9Uzq","zxHJBhvKzuXHBMD1ywDL","zwfJAa","DxnLCKfNzw50s2v5","BunLtNK","vu5nqvnlrurFuKvorevsrvjFv0vcr0W","tufyx1rfwfrvuKvFu0LArq","AgfZt3DUuhjVCgvYDhK","D2vIz2WGCMvUzgvYzxi6","v2LUzg93CW","mxWYFdb8m3W0","q1LVC3q","vvfWBey","rLjbr01ftLrFu0Hbrevs","y3jLyxrLrxzLBNq","yMvrww4","Dw5Rv0K","ChjLy2LZAw9Uig1LzgL1BxaGzMXVyxq7DMfYEwLUzYb2zwmYihzHCNLPBLrLEenVB3jKAw5HDgu7DM9PzcbTywLUkcKGE2DSx0zYywDdB2XVCJ12zwm0khzHCNLPBLrLEenVB3jKAw5HDguSmcWXktT9","tNDVBNy","rKvdta","u2T5CguUrgv0zwn0Aw9U","v0HwDvK","rKvdrZ0","zxvrqvy","AxfPr2K","DKLWB1q","tufyx1rfwfrvuKvFsu1br0vFvu5jvfm","CgvYBwLZC2LVBG","zwTZr2i","mdeYmZq1nJC4owfIy2rLzMDOAwPRBg1UB3bXCNn0Dxz3EhL6qujdrevgr0HjsKTmtu5puffsu1rvvLDywvO","mtHWDcbbCMLHBa","twT1B1a","zMvJqMfZzunVBMzPz193C3L6D2rICq","BNvTyMvY","wg5sCvy","q09mt1jFqLvgrKvsx0jjva","D2vIz2WGzNjHz21LBNqGC2HHzgvYig1LzgL1BsbMBg9HDcbWCMvJAxnPB24GCMfUz2vnyxG6","DxnLCKrLzMLUzwrgB250CW","yxr0ywnOu2HHzgvY","z2v0q29UzMLNigvYCM9Y","wwPzwvm","zvHUCKy","CKLvyLK","AwuGzgv0zwn0igvYCM9Y","DwPJCfa","z2v0v2vIz2Xdyw52yxm","AgfZAa","CxvLCNK","zw5HyMXLvMvYDgv4qxr0CMLIqxjYyxK","seLhsf9gte9bva","tgLUDxG","D2vIz2WGDMvYDgv4ihnOywrLCIbOAwDOigzSB2f0ihbYzwnPC2LVBIbYyw5Nzu1PBJO","mhWYFdn8nhWX","rKvdvW","D2vIz2WGBwf4ihzPzxDWB3j0igrPBxm6","C3bSAxq","suPdBu8","zwfeuve","s1Dzy0i","D0TftM4","ywrcBg9JA0TLEq","zxHJBhvKzvDLyKDmvMvUzg9Yqw5KuMvUzgvYzxi","C3vIBwL0","yNjVD3nLCLr5CgvezxrLy3qGzxjYB3i","u0HbreLor19mqu5hvufhrv9wrvjtsu9o","zwX3A20","vhnKD1e","vKHrC2W","AxnxzwjhBfn1ChbVCNrLza","uKnHzMu","wNLXwhG","D2vIz2WGDMvYDgv4ihnOywrLCIbTzwrPDw0GAw50ihbYzwnPC2LVBJO","t0XVzw8","rNDpz3q","vMTnwfi","DvrTvMW","x193zwjKCML2zxjFzxzHBhvHDgu","wfnjAgq","ChjVDg9JB2W","AwuGzhjPDMvYigvYCM9Y","Bw9UB3nWywnL","z29crMe","z2v0qxzHAwXHyMXLu2nYzwvUuMvZB2X1DgLVBG","sNrXy04","r2XVyMfSignVzgu","B3jPz1HnteH0Dhbszxf1zxn0","C3bHBG","Bg9JywXbAMf4igvYCM9YoG","CLHPCfe","D2vIz2WGBwf4ihrLEhr1CMuGAw1Hz2uGDw5PDhm6","y3b1q2XHC3m","C2vSzw5PDw0","shjVrxe","CgL4zwXsyxrPB0TLEq","qwrVzgiUu3rYzwfT","ChjLu3vIBwL0","yMvNAw5qyxrO","zM9UDfnPEMu","Dg9eyxrHvvjm","wwLdt3q","uvfoEgi","mdaWmdaWmda","z0rxEfO","zMLYzwzVEcbKzxrLy3qGzxjYB3i","D2vIz2WGzNjHz21LBNqGC2HHzgvYig1LzgL1BsbMBg9HDcbWCMvJAxnPB246","z2v0qxr0CMLIDxrL","y2fUDMfZihDPBMrPBMC6","EvvIveu","seHmt0C","rKvdqvm9","v01qBgf5zxiUt0ny","qvjsqvLFqLvgrKvs","tufyx1jftKrfuKjvrKzfuL9tsvPf","nxW5Fdr8mNWXmxW4FdeWFdz8mxWZFdD8ma","DxnLCKfNzw50","yKnyuNe","BMf0AxzLtwfW","zg9Auwu","BLLxu0m","Aw52ywXPzcb1CMW6","twfJCM9TzwrPyuzSyxnOugfWzxiUtwfJCM9TzwrPyuzSyxnOugfWzxi","D3nFCMvMzxjYzxjFB3jPz2LU","wMDstLO","Cer2B2C","yLDJv0C","zw5OB1y","tM90igf2ywLSywjSzq","DLfqBw8","Bg9Hza","yxjJ","tI9b","AgvHzgvYCW","y2XLyxjdB2XVCG","y2fUDMfZ","Eejhv2q","CMvWBgfJzvn0yxrL","x19MEgrYAxzLCL91BNDYyxbWzwq","wePfwM0","ywjZB2X1Dgu","r2rJuuu","B3b0Aw9UCW","uLvdyK8","D2vIz2WGDMvYDgv4ihnOywrLCIbOAwDOigzSB2f0ihbYzwnPC2LVBIbYyw5Nzu1HEdO","zgvZDgLUyxrPB24","zM9YrwfJAa","z2v0rxH0zw5ZAw9U","D2vIz2WGDw5TyxnRzwqGCMvUzgvYzxi6","CgX1z2LUC1nOB3vSzejLu29YDgvK","DxfNyK8","BxvSDgLWBhK","A1n6zxO","y29TCgLSzvnOywrLCG","qwnYB1berI5qrey","t1vevLe","z2v0igTLEsbMywLSzwq","seLhsf9jtLq","zg9JDw1LBNrfBgvTzw50","CM1Vy3GUuMvHBfbSyxLLCIbhmIbdB250CM9S","AxrLBvnPEMu","rejUBMq","DKXxA3q","rLf6sM8","z2v0q2fUDMfZrNa","sgzlC3u","vhzsCLG","yxzHAwXxAwr0Aa","AgfZtgLLze9Zs2v5","D2vIz2WGzNjHz21LBNqGC2HHzgvYigXVDYbPBNqGChjLy2LZAw9UoG","ywX3yxLZ","vfjjqu5htevFu1rssva","CwLItw8","otK5","yNHevfy","AgfZu2vZC2LVBLn0B3jHz2u","yMXMvuS","mtj8mxW5FdiXFde5Fdb8mJb8mNWXohW0FdeZFdiYFdeWFde1Fde2Fdz8n3W4Fde3FdeXFdn8mJn8mtr8nq","uxDRyMe","yxv0B190B29S","D2LKDgG","Au9zAem","C29YDa","tezTzwG","vMLmz1y","zMLYzwzVEf93zwjKCML2zxi","C3DMugf0Aa","C2nYzwvU","Cfzet00","vKvsvevyx1niqurfuG","mZzJtuHStha","CgfPBNq","yK91rgO","tw5uBMi","ms4XlJa","y29VA2LLx3bHCNrPDgLVBMvK","y291Bu8","y3jLyxrLu2HHzgvY","C3vMzML4zxm","AgLZDg9YEq","p0zfq1u9","z2v0rwXLBwvUDhncEvrHz05HBwu","wg9yuwi","y2XLyxi","C2v0q29VA2LLigvYCM9YoG","BLLfELa","Edy0rM1PEa","ExPyDgC","rfbpCue","ChjVDg90ExbL","weLAC3y","CwTes2S","B3vtuMm","DerdtwC","Egjnvw0","vhrSBuy","zMLYC3qTy29UDgvUDgz1Bc1WywLUDa","wxnAwNO","zgvMAw5LuhjVCgvYDhK","AgfYzhDHCMvdB25JDxjYzw5JEq","D2vIz2WGDMvYDgv4ihnOywrLCIbSB3CGzMXVyxqGChjLy2LZAw9UoG","B250B3vJAhn0yxj0","C29YDfbSDwDPBNngB3i","zLfyCLa","u1rsq0O","uxvPy2TuAw1Lq2HLy2TpyMPLy3qUuxvPy2TuAw1Lq2HLy2SUmq","BMvXExq","BwrUDKm","rLPXtwC","tvnsCfO","uKfOCNO","zxHJBhvKzuHHC0XPzwrszxnVBhv0Aw9U","BgvUz3rO","u1rbveLdx0rsqvC","AgfYzhDHCMvdB25JDxjYzw5JEuTLEq","ChjLy2LZAw9U","C3rYAw5N","zg9UDfvZzuzHA2vgB250sw5dyw52yxm","ywXLCNq","rK5Is2m","rKvdqvm","z2v0tMf2AwDHDg9Yq3b1q2XHC3m","D2vIz2WGzNjHz21LBNqGC2HHzgvYigXVDYbMBg9HDcbWCMvJAxnPB24GCMfUz2vnAw46","BLHiwMm","v2n0wLq","t3nHBui","uvPWsxG","tvf5zeG","BhblC0u","zevMq20","zMLUz2vYChjPBNrQCZi","CMvSB2fK","D2vIA2L0qxvKAw9dB250zxH0","zgT3ChO","zg9WCgXLCKzHy3rVCG","zMnyt0e","DwTfBem","DKflzvG","D3nFCMvMzxjYzxjFB3jPz2LUpq","y1PxDuS","Aw5KzxHLzerIs2v5","zMXHC2GVy29TCgLSzwqVrM9UDeXPC3qUC3DM","D2vIz2WGywXPyxnLzcbWB2LUDcbZAxPLihjHBMDLoG","y2HYB21LigrYAxzLCIbLCNjVCG","BgLUzuHLAwDODa","sgT2sgG","nZq4mZu0mKHAu3brta","tfLZv2W","y2HYB21LigrLDgvJDcbLCNjVCG","rKvduZ0","C2PzvgW","rvHux3rLEhr1CMvFzMLSDgvYx2fUAxnVDhjVCgLJ","Dg91y2HZDgfYDa","CejVrfC","DxnLuhjVz3jHBq","D2vIz2WGzNjHz21LBNqGC2HHzgvYig1LzgL1BsbPBNqGChjLy2LZAw9UihjHBMDLtwLUoG","D2vIz2WGDMvYDgv4ihnOywrLCIbSB3CGzMXVyxqGChjLy2LZAw9UihjHBMDLtwLUoG","B25szwfKEq","zg9JDw1LBNq","BfvUB20","z2v0tMf2AwDHDg9YugXHDgzVCM0","qNjPyw4Gugf1Ba","D2vIz2WGDw5TyxnRzwqGDMvUzg9YoG","D2vIz2WGzNjHz21LBNqGC2HHzgvYigHPz2GGAw50ihbYzwnPC2LVBIbYyw5Nzu1PBJO","zM9UDa","D2vIz2WGDMvYDgv4ihnOywrLCIbOAwDOigLUDcbWCMvJAxnPB24GCMfUz2vnyxG6","CKXMq3K","CMvTB3zLq2HPBgq","yxfRvge","BgLUA1bYB2DYyw0","D2vIz2WGzNjHz21LBNqGC2HHzgvYig1LzgL1BsbPBNqGChjLy2LZAw9UihjHBMDLtwf4oG","zenwCLK","we1zwwG","yxbWtMfTzq","DhLWzq","q1fhsg0","zM9UDezHBwLSEq","zejMyLa","tu9Ax0vyvf90zxH0DxjLx2zPBhrLCL9HBMLZB3rYB3bPyW","B2zMC2v0sgvPz2H0","DfD6tfe","y1zrwvy","uKvex0jjvfm","C2vYDMvYx3rPBwu","z2v0sgfZtgLLzeXHBMD1ywDLCW","z2v0u2HHzgvYuhjLy2LZAw9UrM9YBwf0","zxHJBhvKzvDLyKDm","uKvorevsrvi","uNrQr3i","CMfUzg9T","zxHWB3j0CW","yMLUzej1zMzLCG","D2vIz2WGzNjHz21LBNqGC2HHzgvYigHPz2GGAw50ihbYzwnPC2LVBJO","wLreAMi","ywrKqMvOyxzPB3i","BxnnyxHuB3vJAfbVAw50CW","uMvHBfbSyxLLCG","quXjqvnfrf9qt0Lovf9tsvPfx1jbtKDf","zvLcqMe","vMPSwvK","p3DZx3jLzMvYCMvYx29YAwDPBJ0","D2vIz2WGDMvYDgv4ihnOywrLCIbSB3CGAw50ihbYzwnPC2LVBJO","qw5KywXLie1VBM87qxjPywW7qxjPywWGqMXHy2S7qxjPywWGsgvICMv3o0fYAwfSie1uo0fYAwfSie5HCNjVDZTbCMLHBcbsB3vUzgvKie1uiejVBgq7qxjPywWGvw5Py29KzsbnuZTcAxrZDhjLyw0GvMvYysbtyw5Zie1VBM87qM9VAYbbBNrPCxvHo0jVB2TTyw4Gt2XKifn0EwXLo0nHBgLICMK7q2fTyNjPytTdyw1ICMLHie1HDgG7q2vUDhvYEtTdzw50Dxj5ieDVDgHPyZTdzw50Dxj5ifnJAg9VBgjVB2S7q29TAwmGu2fUCZTdB21PyYbtyw5Zie1to0nVBNnVBgfZo0nVDxjPzxi7q291CMLLCIbozxC7r2fYyw1VBMq7r2vUzxzHo0DLB3jNAwe7sgvSDMv0AwnHo0HLBhzLDgLJysbozxvLo0LTCgfJDdTmDwnPzgeGqNjPz2H0o0X1y2LKysbdywXSAwDYyxbOEtTmDwnPzgeGq29UC29SztTmDwnPzgeGrMf4o0Xvq0LeqsbhuKforeu7thvJAwrHieHHBMr3CML0Aw5No0X1y2LKysbtyw5Zo0X1y2LKysbtyw5Zifr5Cgv3CML0zxi7thvJAwrHifnHBNmGvw5Py29KztTnAwnYB3nVzNqGu2fUCYbtzxjPzJTnB25Hy287tw9UB3r5CguGq29YC2L2ytTnuYbhB3rOAwm7tvmGt3v0Bg9VAZTnuYbqr290AgLJo01tifjLzMvYzw5Jzsbtyw5ZifnLCMLMo01tifnHBNmGu2vYAwy7tvmGu2vYAwy7tvLssufeo01zuKLbrcbquK87ugfSyxrPBM87ugfSyxrPBM8GtgLUB3r5Cgu7u2vNB2uGuhjPBNq7u2vNB2uGu2nYAxb0o1nLz29Lifvjo1nLz29LifvjieXPz2H0o1nLz29LifvjifnLBwLIB2XKo1nLz29Lifvjifn5BwjVBdTuywHVBwe7vgLTzxm7vgLTzxmGtMv3ifjVBwfUo1rPBwvZie5LDYbsB21HBIbquZTuCMvIDwnOzxqGtvm7vMvYzgfUytTxAw5NzgLUz3m7v2LUz2rPBMDZidi7v2LUz2rPBMDZidm","rMLUz2vYChjPBNq","vMT4ELe","su9ste8","A2DjuhG","z2v0rw50CMLLC0j5tMfTzq","zw5eB1m","BM90AwzPy2f0Aw9UCW","B29Vu3u","D2vIz2WGBwf4igfUAxnVDhjVChK6","vePhrNm","D2vIz2WGC2HHzgLUzYbSyw5NDwfNzsb2zxjZAw9UoG","vKvZy3a","BgvMDa","y2XPzw50sw5MB3jTyxrPB24","q3DTigzQB3jKyMfUAYbNBhLWAhmGDMv4DcbXDwL6lcdWN5Id","vfnMrei","Aejdzey","ruD4qwi","wufRsha","CMfUz2vnAw4","vu5nqvnlrurFvKvore9sx1DfqKDm","ntG5nZDnt1jrAvC","D2vIz2WGCMvKigjPDhm6","y2XVC2vqyxrO","txn4BwWYlLHnteHuvfa","CgXHDgzVCM1lzxK","zxHJBhvKzunWDunSyxnZ","BuHbuMi","z2v0vgLTzxPVBMvpzMzZzxq","yM1MEMm","BKvfzhK","t2jQzwn0lJXHBM9UEw1VDxm+","mtr8mtf8mtb8mNWXm3WXFdn8n3WWFdr8nNWXnxW4FdeYFdv8oq","C3LZDgvTtgfUz3vHz2u","u2nYAxb0Aw5NlKrPy3rPB25HCNK","y2HHCKnVzgvbDa","qwDSExC","ywPHEf9VyMO","txn4BwWYlKrpturVy3vTzw50","z2v0rNvUy3rPB25oyw1LigvYCM9Y","ugvYzM9YBwfUy2vpyNnLCNzLCG","odv8mZL8mJH8ndv8mZf8nZr8odn8odj8ndf8ndr8ntz8nZD8ndL8nZn8ntL8mtH8odH8ndj8mNWXm3W0FdKWFdG2Fdq4Fde2FdeWFdb8otv8otf8nJb8ohW4oxW1nhW5mNW5m3W3mhW2oxWXoxW1ohW2mNWYnxWZmNWXn3W5nhW3ohW3oxW1Fdf8oxWYmNWYn3WXnxW0m3WZnxW2nhW0n3W2m3W1mxWZnNWYm3W1mhWYnhW4nhWYoxW3mNWXmNWZohWZm3W2ohW1nxWZmhWXnhWZnhW2mxW3FdqWFdGWFdn8otz8ntn8nJz8odD8nZf8nZv8ntj8mtf8mZD8odf8mJb8otD8ndz8ntD8mJz8nJD8nNW3nNWYmxW2nq","ywrKrMXHC2HeAxzoB2rL","z1bVvKG","Aw5Uzxjive1m","yxbWvMvYC2LVBG","y2XHC3noyw1L","qNvosMu","vgv6wfK","jM5IC3a7","B2zMC2v0vw5PzM9YBq","z2v0sgfZtgLLzejYB3DZzxi","qxvKAw9dB250zxH0","t1fhv3m","qxr6u3G","rg1quu8","tMv0C2nHCgu","uxvPy2TuAw1LlLf1AwnRvgLTzq","zgvMAw5L","D2vIz2WGyw50AwfSAwfZAw5NoG","werJAhm","os4WlJa","whHsEvK","Dg9Wuxi","CMvMzxjYzxi","yw50AwfSAwfZ","mtn8oxWXmNWXn3WXnNW2Fdn8n3WWFdf8mtH8nxWXmhWYFdeXFde0FdH8nhWXnq","zw1Izwrtv0y","zNvUy3rPB24","D2vIz2WGBwf4ihrLEhr1CMuGC2L6ztO","BgfUz3vHz2vZ","u3DTAMm","sMfztfi","y3HmrNu","tK1XrLm","BNHuz0y","swHutK4","EKrlrMi","sKTRtvG","BwLNu0y","Dg91y2G","v0vcr0XFzgvIDwDFCMvUzgvYzxjFAw5MBW","B3HzA00","C3fTqxK","B3nJChu","tKfPvwC","yvP6Agi","DMvYDgv4ug9Zqxr0CMLI","q29UC29SzunVCMu","z2v0vvrdvgLTzsbLCNjVCG","Cg9QC0y","tfvUyvC","y29SB3jezxb0AeTLEq","D2vIz2WGywXWAgeGyML0CZO","ChjVzhvJDfn1yG","y2fSBfbOyw50B20","rMLYzwzVEa","AM9PBG","tevrvufm","C3rHy2S","z2fHu2C","BfLbEKe","v0vcs0Lux0vyvf90zxH0DxjLx2zPBhrLCL9HBMLZB3rYB3bPyW","r0u6zxjYB3i","sKn6tgi","zM9YBxm","x3bOyw50B20","z2v0rwXLBwvUDej5swq","Bhn0suC","yuDZz0i","AhHJA19MAq","sgP5vNe","yM9KEq","AMHNueK","txz4qNG","qwn0AxzLwe9IAMvJDa","CMvWBgfJzq","zg9oB3ruCMfJA0TLEq","D2vID2C","zgv0zwn0u2nYzwvUt3jPzw50yxrPB24","revqveHFqKLuuW","Aw5UzxjuzxH0","Dw5PzM9YBtjM","B3rOzxjFD2vIzhjPDMvY","y1zzCuS","sfnZBwq","sxjhz2S","CgX1z2LUCW","zxzLBM9Kza","AxHNENu","AgfZtg9JywXtDg9YywDL","zgvWDgHgDw5J","wurStMm","zg9oB3ruCMfJAW","D2vIz2Xwzw5KB3jbBMrszw5KzxjLCKTLEq","A2v5","C1nPz00","zMLSBfrLEhq","BLbjCgy","y29UC3rYDwn0B3i","x193zwjKCML2zxjFC2nYAxb0x2zU","te1zBve","Aw52ywXPzcbHCMD1BwvUDa","u0vYr0q","zgLZCgXHEq","BwfW","mtL8nhWXmNW1Fdn8ohWXnhWXm3W2FdeXFdL8mtD8mNWXohWYmxWXnNWYmNWXmhWYmhWXFde1Fdb8nW","z2v0qwrcBg9JAW","AfjXyNa","A3zhtNq","sLfftMW","C3bLzwrpzLnVDw5K","D2vIz2WGzNjHz21LBNqGC2HHzgvYig1LzgL1BsbMBg9HDcbWCMvJAxnPB24GCMfUz2vnAw46","AhjLzG","BvDsDwe","r0rtwKG","y3vYCMvUDfrPBwu","rxjYB3iGAw4Gy29VA2LLrw5JCNLWDdO","AurKyNe","revqveHFvevtva","B1vpEKK","o1nHBwvtAxrLpu5VBMu7u2vJDxjL","AuDMALm","zwrNzq","y3vZDg9TrNvUy3rPB24","qwDdB250CM9SlKfNq29UDhjVBa","quXqsefFqKLuuW","CMDIkdaSmJu1ldi1nsK","D2vIzhjPDMvY","mtuXmeDRr3vwCW","sfDyyMS","rg5fBui","DhjPzgvUDa","BwfJ","uLbxqMi","rKvdqt0","ltK5otLWEa","yxr0ywnOrxzLBNq","y2fSBa","seLerfy","zgL2","z2v0rg9oB3ruCMfJAW","CMDIkdi1nsWYntuSmcK","Cfv1Avm","yLLuDeO","Dg9VBfr5CgvezxrLy3qGzxjYB3i","rgvIDwDkCW","reHNChO","qMLYA1K","CMPTsK0","ANvXAMm","zujgAMK","B3rLB0y","x19FzNbFC3DMx2XVywrLza","Ag9ZDg5HBwu","D3rYqLu","jKzfq1u9","swPJzfy","D2vIz2WGDMvYDgv4ihnOywrLCIbTzwrPDw0GzMXVyxqGChjLy2LZAw9UoG","vMXvCNm","q215Efa","t3bLCMe","AgfZtgLLzeXHBMD1ywDLC0TLEq","nxWYFdr8mxW2Fdb8mW","twfJ","rwjot08","y3jLyxrLqw5HBhLZzxi","uxPsA0e","D2vIz2WGzNjHz21LBNqGC2HHzgvYigXVDYbPBNqGChjLy2LZAw9UihjHBMDLtwf4oG","zMXVB3i","vNH4Efy","C0Xrzvu","B3bLBKrHDgfIyxnLs2v5","BM9YBwfS","D2vIz2WGz3jLzw4GyML0CZO","tLjfBKy","ntq0ngzqELrssa","C3vIC3rY","D2vIz2WGDMvUzg9YoG","CMzQEee","C2HLBgWUvuLOzwXWzxi","BenOq3C","rxjYB3iGAw4GAg9VA0z1BJO","C2vZC2LVBLn0B3jHz2vlzxK","Bg9JyxrPB24","D2LUzg93CYbWAg9Uzq","tMvbCvm","zKXVAgW","AxbOB25L","qKXvrv9csvrt","DgLTzxPVBMvpzMzZzxrlzxK","z2v0ugfYyw1LDgvY","D2vIz2WGBwf4ihzLCNrLEcb0zxH0DxjLigLTywDLihvUAxrZoG","CNjwEuy","txHptfG","Dg91y2HtDxbWB3j0s2v5","zvrrwKC","z2v0u3vWCg9YDgvKrxH0zw5ZAw9UCW","AgvPz2H0","z2v0t3DUuhjVCgvYDhLezxnJCMLWDg9Y","rgPSyNe","Cg9YDa","rhnZB08","D2XoyMy","Ehbhshe","ELnLqLG","z2v0","uwzNv20","rgv2ywXwuLHdDhjSlKrLDMfSvLjyq3rYBc4X","uKf4yMy","CKrKBMu","Cg94rfO","D2vIz2WGBwf4ihzLCNrLEcbHDhrYAwjZoG","B2jQzwn0","zxHJBhvKzunHBNzHCW","EwDtEKy","D3n5ENDKyNe","rxjPExq","z2v0uMfUzg9Tu3rYAw5NigvYCM9Y","DxLpzhq","mxW4Fdm5Fdi4FdeWFdD8mtL8mtn8mtj8mtH8mhW0FdmWFdiYFde0Fdm2FdiZFdiXFdm4Fdi0Fdj8m3WZnhWXn3W2FdeXFdi2FdL8mtz8mZf8mJL8nxWZm3WZmNWYn3WZnxWXnxWYnxWYmhWZnW","zvDmvuO","AKjZreC","zeDLrum","CvvpsgC","Dgv4DejHC2vSAw5L","zxHWzxjPBwvUDgfSlxDLyMDS","v2HMte4","C3r5Bgu","zxHJBhvKzuHHC0XPzwrpCW","Be1Ht2u","qvfpDu4","nJCWmerRtgDmqq","zxH0zw5K","uunHqKm","zg15y2q","z2v0qxr0CMLItg9JyxrPB24","D2vIz2WGDMvYDgv4ihnOywrLCIbSB3CGAw50ihbYzwnPC2LVBIbYyw5Nzu1PBJO","z2XVyMfSq29TCg9ZAxrLt3bLCMf0Aw9U","ww5JBNG","DLPhuhO","C2nYzwvUuMvZB2X1DgLVBKTLEq","ELnkA1a","D2vIz2WGBwf4ign1yMuGBwfWihrLEhr1CMuGC2L6ztO","u2LKzwvyugXHEwLUz0zSywC","B3v0zxjxAwr0Aa","Agzxuvi","u1HIBhq","D2vIz2WGDMvYDgv4ihnOywrLCIbOAwDOigLUDcbWCMvJAxnPB24GCMfUz2vnAw46","twvZysbpzMzty3jLzw4","tufyx1zjrvDqt1jux0rjtvm","C2vJDxjL","Dg9tDhjPBMC","rKvdv1m","rKvdtG","uurHq3e","zhjHD0fYCMf5CW","Buj5AKm","CgXHDgzVCM0","BKXrsei","B3bLBG","tufyx1rfwfrvuKvFtufyx0fosvnpvfjpufLFrvHu","AxnFzgvIDwDNzxi","D2vIz2WGDMvYDgv4ihnOywrLCIbTzwrPDw0GzMXVyxqGChjLy2LZAw9UihjHBMDLtwLUoG","Dg9tB3vYy2u","Be9vr0q","C3DMB2jQzwn0","DhzzBMe","zfjdz1C","BKzJzLu","BenkufC","C2v0uMvXDwvZDeHLywrLCG","z2v0vg91y2HtDxbWB3j0","BvfiDLm","wgH4Cxy","o1nLy3vYztTqyxj0AxrPB25Lza","z2v0v2vIz2XgCa","quzMy0S","twr3tNq","tfjgy2K","u2XQC3y","ww9osKq","zM9UDhnlzxK","oxWWFdv8mtb8nhWYFdH8nNWZFdD8mq","B3rOzxi","ywPHEf9LEa","B2zMC2v0v2LKDgG","u1f0y0S","swfizeS","zw5HyMXL","t0PTDei","zxHLyW","y2fUDMfZigzWoG","Dw5KzwzPBMvK","EwvZ","BunVvuS","C3rYAw5NAwz5","BMfTzq","z2v0t3jPz2LUigvYCM9Y","wxrjsKq","zMfSC2u","ywrZyM94","EgHez2q","jNDZx3jLzMvYCMvYx29YAwDPBJ0","B3v0zxjizwLNAhq","DxjS","D2vIz2WGywXPyxnLzcbSAw5LihDPzhrOihjHBMDLoG","yxDvCwe","tLLozu0","ELv6CvC","D2vIz2WGzNjHz21LBNqGC2HHzgvYigHPz2GGzMXVyxqGChjLy2LZAw9UihjHBMDLtwLUoG","zxHJBhvKzuLUzgv4zwreqG","Bwf4vg91y2HqB2LUDhm","z2v0q29VA2LLigvYCM9Y","AgvHzgXLC3nezxrLy3qGzxjYB3i","zKn1q2e","Dgn5D1G","sxvZEeK","zxHJBhvKzufKzejLAgf2Aw9Y","v1jIwM4","vMPjCKO","q2XUwNy","zMLSBfn0EwXL","uMvHBfbSyxLLCI5szwfSugXHEwvYkhrTksbby3rPDMvyienVBNrYB2WGkdmYlwjPDcK","D2vIz2WGBwf4ihzLCNrLEcb1BMLMB3jTihzLy3rVCNm6","qLftqum","zxHJBhvKzvbSyxrMB3jT","tKTPt1y","CM1Vy3GUuMvHBfbSyxLLCIbhmIbdB250CM9SlJe","CMvJDa","zMLSBfjLy3q","Bw91C2u","z2v0q29UDgv4Da","t3v0v1C","C2fMyxjP","C2v0qxr0CMLIDxrL","q2HYB21L","C2vSzw5PDw0TAgLNAgXPz2H0","B2jZzxj2zq","y29TBw9UigrLDgvJDcbLCNjVCG","D2vIz2XlzxK","y1DPC24","ChvZAa","AxbVza","AxnqB2LUDeLUugf0Aa","v3vkt0C","yK5rvui","v295wLO","mhWYFdv8nhWZFde","BxneB05VDfrYywnR","yxzHAwXHyMXLu2nYzwvUuMvZB2X1DgLVBKTLEq","zgf0yuzVCM1HDcbLCNjVCG","zgv2AwnLugL4zwXsyxrPBW","v0j0Eu0","BNvczeu","zMLSDgvY","yxzHAwXizwLNAhq","rLnwqxC","DwnICM93C2vY","tufyx1zfuLrfwf9bvfrssujt","BuPYr2q","Dw5PzM9YBu9MzNnLDa","yxbWzw5Kq2HPBgq","verdq3rSlLreq0n0Ba","AefYsxG","C2v0sxrLBq","z1rzve8","z2v0v2vIz2Xwzw5KB3jbBMrszw5KzxjLCG","rK5rB0m","qLvnwfa","BMHLDhm","kcGOlISPkYKRksSK","y29Uy2f0","tLHJA2q","CMfUz2vnyxG","BgLUDxG","DezVsfq","mJu5odHVzfLwwLO","CMDIysGXmdiSidiWncWGmcWGmc4Ykq","teLyEKG","zxHJBhvKzuHHCMr3yxjLq29Uy3vYCMvUy3K","wNv0sgO","wxf2Afa","quXMEKW","i2y2ma","BvfxrfK","zMLYzwzVEcbKCML2zxiGzxjYB3i","Bw1TBw1TBw1TBwXSAq","BMf2AwDHDg9Y","u1DdDgWUu1DdDgW","zMv0y2G","y2j2q3G","tuvesvvnx0Lova","Cg1SreK","zxHJBhvKzvrVDwnOu3vWCg9YDa","B3jPz2LU","B3rOzxjeCML2zxi","AgfZrMXHC2HqBgf5zxjwzxjZAw9U","CMvTB3zLsxrLBq","BxfXyNjVD3nLCG","ugHHBNrVBuPtigvYCM9Y","DLzTrhe","verdq3rSlLreq2n0Ba","Aw5UzxjxAwr0Aa","zvLbsK4","sgzYrMG","z2XlBfi","zw1etxq","B3bLBKrHDgfIyxnL","DMX3AuS","q25AvNu","y0nPswq","y291BNq","AhzQuu0","t3rOzxi","EM1NDu8","zgvZy3jPChrPB24","ptSGCgf0Ad0VoYbLEhbPCMvZpvrODsWGmdeGsMfUide5nZaGmda6mda6mdaGr01uo1nLy3vYzq","z2v0rwXLBwvUDhncEunSyxnZtMfTzq","t2zfAg0","Aw5SAw5L","BgLZDgvUzxi","BwLJCM9TzxnZzw5Nzxi","y2HLy2TtDgfJAYbLCNjVCG","y2HYB21Lx3DLyMrYAxzLCG","yxbWBhK","tuzWvKe","EKfHq2K","y2fUDMfZs2v5","o3bHDgG9lW","CLfjuLG","CfjUrxu","vxfZAMC","AgfZtgLLzejYB3DZzxjlzxK","tNnMCK0","BgfUz3vHz2vlzxK","yNvMzMvYzwq","iZa2oq","CgvYBwLZC2LVBNm","BeHeAKO","C2vHCMnO","qwTdELy","yw1K","CgfYC2u","ywrKqMvOyxzPB3jlzxK","zxHJBhvKzvvZzxjbz2vUDa"]}
//解密函数
function a0_0x3b96(_0x4aed28,_0x1db21e){var _0x1174e9=a0_0x56fd();return a0_0x3b96=function(_0x524b41,_0x53c8f1){_0x524b41=_0x524b41-0x9b;var _0x56fd12=_0x1174e9[_0x524b41];if(a0_0x3b96['kXlLNJ']===undefined){var _0x3b9653=function(_0x3a1f77){var _0x298638='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x27c100='',_0x1cc700='',_0x168a98=_0x27c100+_0x3b9653;for(var _0x473187=0x0,_0x1ded5a,_0x5b5086,_0x54d580=0x0;_0x5b5086=_0x3a1f77['charAt'](_0x54d580++);~_0x5b5086&&(_0x1ded5a=_0x473187%0x4?_0x1ded5a*0x40+_0x5b5086:_0x5b5086,_0x473187++%0x4)?_0x27c100+=_0x168a98['charCodeAt'](_0x54d580+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x1ded5a>>(-0x2*_0x473187&0x6)):_0x473187:0x0){_0x5b5086=_0x298638['indexOf'](_0x5b5086)}for(var _0x13fd81=0x0,_0x503a29=_0x27c100['length'];_0x13fd81<_0x503a29;_0x13fd81++){_0x1cc700+='%'+('00'+_0x27c100['charCodeAt'](_0x13fd81)['toString'](0x10))['slice'](-0x2)}return decodeURIComponent(_0x1cc700)};a0_0x3b96['DmOlGj']=_0x3b9653,_0x4aed28=arguments,a0_0x3b96['kXlLNJ']=!![]}var _0x1037c4=_0x1174e9[0x0],_0x4a0adc=_0x524b41+_0x1037c4,_0x2ac178=_0x4aed28[_0x4a0adc];if(!_0x2ac178){var _0x386ce9=function(_0x1513a6){this['rReaPI']=_0x1513a6,this['VUcADX']=[0x1,0x0,0x0],this['SYeAMG']=function(){return'newState'},this['oWFusO']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['ndiEvF']='[\x27|\x22].+[\x27|\x22];?\x20*}'};_0x386ce9['prototype']['iyRPee']=function(){var _0x417b9c=new RegExp(this['oWFusO']+this['ndiEvF']),_0x22ee04=_0x417b9c['test'](this['SYeAMG']['toString']())?--this['VUcADX'][0x1]:--this['VUcADX'][0x0];return this['CjTQoC'](_0x22ee04)},_0x386ce9['prototype']['CjTQoC']=function(_0x29027f){if(!Boolean(~_0x29027f))return _0x29027f;return this['NiNrrr'](this['rReaPI'])},_0x386ce9['prototype']['NiNrrr']=function(_0x1c31df){for(var _0x342935=0x0,_0xd94d2e=this['VUcADX']['length'];_0x342935<_0xd94d2e;_0x342935++){this['VUcADX']['push'](Math['round'](Math['random']())),_0xd94d2e=this['VUcADX']['length']}return _0x1c31df(this['VUcADX'][0x0])},new _0x386ce9(a0_0x3b96)['iyRPee'](),_0x56fd12=a0_0x3b96['DmOlGj'](_0x56fd12),_0x4aed28[_0x4a0adc]=_0x56fd12}else _0x56fd12=_0x2ac178;return _0x56fd12},a0_0x3b96(_0x4aed28,_0x1db21e)}

// ============================================================================
// 1. AST 初始化
// ============================================================================
const sourceFile = "hxk_fec.js";
const sourceCode = fs.readFileSync(sourceFile, "utf-8");
const ast = parser.parse(sourceCode);

// 全局变量
const decryptFuncNames = new Set(["a0_0x3b96"]);
const GlobalDicts = {}; // 存放对象映射字典
let stringDecryptCount = 0;
let objectMappingCount = 0;
let flattenCount = 0;
let cleanupCount = 0; // 新增：清理计数

function resolveArgument(argNode, scope) {
    if (t.isLiteral(argNode)) return argNode.value;
    if (t.isUnaryExpression(argNode) && argNode.operator === '-' && t.isLiteral(argNode.argument)) return -argNode.argument.value;
    if (t.isMemberExpression(argNode)) {
        const objectName = argNode.object.name;
        const propertyName = argNode.property.name || argNode.property.value;
        const binding = scope.getBinding(objectName);
        if (binding && t.isVariableDeclarator(binding.path.node) && t.isObjectExpression(binding.path.node.init)) {
            const properties = binding.path.node.init.properties;
            for (const prop of properties) {
                const keyName = prop.key.name || prop.key.value;
                if (keyName === propertyName) return resolveArgument(prop.value, scope);
            }
        }
    }
    return null;
}

// ============================================================================
// PART 3: AST 遍历 (四步走)
// ============================================================================

// -------------------------------------------------------------
// STEP 1: 字符串解密
// -------------------------------------------------------------
console.log("Step 1: 执行字符串解密...");
traverse(ast, {
    VariableDeclarator(path) {
        const { id, init } = path.node;
        if (t.isIdentifier(init) && decryptFuncNames.has(init.name)) {
            decryptFuncNames.add(id.name);
        }
    },
    CallExpression(path) {
        const { callee, arguments: args } = path.node;
        if (t.isIdentifier(callee) && decryptFuncNames.has(callee.name)) {
            const resolvedArgs = [];
            let canDecrypt = true;
            for (const arg of args) {
                const val = resolveArgument(arg, path.scope);
                if (val === null) { canDecrypt = false; break; }
                resolvedArgs.push(val);
            }
            if (canDecrypt) {
                try {
                    const decryptedValue = a0_0x3b96(...resolvedArgs);
                    if (typeof decryptedValue === 'string') {
                        path.replaceWith(t.stringLiteral(decryptedValue));
                        stringDecryptCount++;
                    }
                } catch (e) {}
            }
        }
    }
});

// -------------------------------------------------------------
// STEP 2: 对象映射/花指令还原
// -------------------------------------------------------------
console.log("Step 2: 扫描并还原对象映射字典...");

// 2.1 扫描字典 (收集阶段)
traverse(ast, {
    VariableDeclarator(path) {
        const { id, init } = path.node;
        if (!t.isIdentifier(id) || !t.isObjectExpression(init)) return;

        const dictName = id.name;
        const props = {};
        let isDict = false;

        for (const prop of init.properties) {
            if (!t.isObjectProperty(prop)) continue;

            const key = prop.key.value || prop.key.name;
            const value = prop.value;

            if (t.isLiteral(value)) {
                props[key] = { type: "literal", val: value };
                isDict = true;
            } else if (t.isFunctionExpression(value) || t.isArrowFunctionExpression(value)) {
                const body = value.body;
                if (t.isBlockStatement(body) && body.body.length === 1 && t.isReturnStatement(body.body[0])) {
                    const retArg = body.body[0].argument;
                    if (t.isBinaryExpression(retArg)) {
                        props[key] = { type: "binary", op: retArg.operator };
                        isDict = true;
                    } else if (t.isLogicalExpression(retArg)) {
                        props[key] = { type: "logical", op: retArg.operator };
                        isDict = true;
                    } else if (t.isCallExpression(retArg)) {
                        props[key] = { type: "call" };
                        isDict = true;
                    }
                }
            }
        }
        if (isDict) GlobalDicts[dictName] = props;
    }
});

// 2.2 替换映射调用 (替换阶段)
traverse(ast, {
    CallExpression(path) {
        const { callee, arguments: args } = path.node;
        if (t.isMemberExpression(callee)) {
            const objName = callee.object.name;
            const propName = callee.property.value || callee.property.name;

            if (GlobalDicts[objName] && GlobalDicts[objName][propName]) {
                const mapping = GlobalDicts[objName][propName];
                try {
                    if (mapping.type === "binary" && args.length === 2) {
                        path.replaceWith(t.binaryExpression(mapping.op, args[0], args[1]));
                        objectMappingCount++;
                    } else if (mapping.type === "logical" && args.length === 2) {
                        path.replaceWith(t.logicalExpression(mapping.op, args[0], args[1]));
                        objectMappingCount++;
                    } else if (mapping.type === "call" && args.length >= 1) {
                        const [funcNode, ...funcArgs] = args;
                        path.replaceWith(t.callExpression(funcNode, funcArgs));
                        objectMappingCount++;
                    }
                } catch(e) {}
            }
        }
    },
    MemberExpression(path) {
        const { object, property } = path.node;
        if (!t.isIdentifier(object)) return;
        const objName = object.name;
        const propName = property.value || property.name;

        if (GlobalDicts[objName] && GlobalDicts[objName][propName]) {
            const mapping = GlobalDicts[objName][propName];
            if (mapping.type === "literal") {
                path.replaceWith(mapping.val);
                objectMappingCount++;
            }
        }
    }
});

// -------------------------------------------------------------
// STEP 3: 控制流平坦化还原
// -------------------------------------------------------------
console.log("Step 3: 还原控制流平坦化...");
traverse(ast, {
    WhileStatement(path) {
        const { test, body } = path.node;
        if (!t.isUnaryExpression(test) && !t.isBooleanLiteral(test)) return;
        if (!t.isBlockStatement(body)) return;

        const switchStmt = body.body.find(node => t.isSwitchStatement(node));
        if (!switchStmt) return;

        const discriminant = switchStmt.discriminant;
        if (!t.isMemberExpression(discriminant)) return;
        const arrayNameNode = discriminant.object;
        if (!t.isIdentifier(arrayNameNode)) return;
        const arrayName = arrayNameNode.name;

        const binding = path.scope.getBinding(arrayName);
        if (!binding) return;

        const initNode = binding.path.node.init;
        let sequenceString = null;

        if (t.isCallExpression(initNode) && t.isMemberExpression(initNode.callee) && t.isStringLiteral(initNode.callee.object)) {
            const property = initNode.callee.property;
            if ((t.isIdentifier(property) && property.name === 'split') || (t.isStringLiteral(property) && property.value === 'split')) {
                sequenceString = initNode.callee.object.value;
            }
        }

        // 如果是 VariableDeclarator，可能是已经解密好的字符串: var _0x123 = "1|2|3".split('|')
        if (!sequenceString && t.isStringLiteral(initNode)) {
             // 这种情况在平坦化数组也是加密时会出现，这里简单处理
        }

        if (!sequenceString) return;

        const sequence = sequenceString.split('|');
        const cases = switchStmt.cases;
        const caseMap = {};

        cases.forEach(caseNode => {
            if (t.isStringLiteral(caseNode.test)) {
                caseMap[caseNode.test.value] = caseNode.consequent;
            }
        });

        const newBody = [];
        sequence.forEach(seqIndex => {
            const statements = caseMap[seqIndex];
            if (statements) {
                statements.forEach(stmt => {
                    if (!t.isContinueStatement(stmt)) {
                        newBody.push(stmt);
                    }
                });
            }
        });

        path.replaceWithMultiple(newBody);
        binding.path.remove();
        if (t.isUpdateExpression(discriminant.property)) {
            const indexName = discriminant.property.argument.name;
            const indexBinding = path.scope.getBinding(indexName);
            if (indexBinding) indexBinding.path.remove();
        }
        flattenCount++;
    }
});

// -------------------------------------------------------------
// STEP 4: 死代码清理 (删除已还原的对象字典)
// -------------------------------------------------------------
console.log("Step 4: 清理未引用的变量 (Dead Code Elimination)...");

// 在进行死代码清理前，需要刷新 Scope，因为之前的 replaceWith 可能导致引用信息过时
traverse(ast, {
    Program(path) {
        path.scope.crawl(); // 强制重算引用
    },
    VariableDeclarator(path) {
        const { id } = path.node;
        if (!t.isIdentifier(id)) return;

        // 检查这个变量是否是我们之前识别出的字典
        if (GlobalDicts[id.name]) {
            const binding = path.scope.getBinding(id.name);

            // 如果引用计数为 0，说明所有调用都已经被替换了，可以安全删除
            if (binding && !binding.referenced) {
                path.remove();
                cleanupCount++;
            }
        }
    }
});

// ============================================================================
// 4. 输出结果
// ============================================================================
console.log(`\n========== 解混淆报告 ==========`);
console.log(`- 字符串解密: ${stringDecryptCount} 处`);
console.log(`- 对象映射还原: ${objectMappingCount} 处`);
console.log(`- 流程平坦化还原: ${flattenCount} 处`);
console.log(`- 死代码清理: ${cleanupCount} 处`);

const output = generator(ast, {
    jsescOption: { "minimal": true }
}).code;

fs.writeFileSync("output.js", output);
console.log(`\n已保存结果到 output.js`);