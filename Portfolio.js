function sendmail()
{
    var var1 = Math.floor(Math.random() * 6) + 1;
    var var2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("add").innerHTML= ""+var1+"+"+var2+"";
    var ans;
    ans=var1+var2;
    var eans=document.suggform.var.value;
        if(ans==eans)
    {
        return(true);
    }
    else{
        return(false);
    }
    //alert("mail sent successful")
}