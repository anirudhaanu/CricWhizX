export default playerTypeSpliter=(dataArray)=>{
    var batsmans=[];
    var bowlers=[];
    dataArray.map((item)=>{
        if(item.role==='batsman') batsmans.push(item)
        else if(item.role==='bowler') bowlers.push(item)
    })

    return {batsmans,bowlers}
}