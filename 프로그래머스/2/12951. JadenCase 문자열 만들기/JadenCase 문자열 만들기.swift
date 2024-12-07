func solution(_ s:String) -> String {
    var result = ""
    var firstChar = true
    
    for char in s {
        if char == " " {
           result.append(" " )
            firstChar = true
        } else if firstChar == true {
            result.append(char.uppercased())
            firstChar = false
        } else {
            result.append(char.lowercased())
        }
    }
    
    return result
}